"use server";

import * as Sentry from "@sentry/nextjs";
import { setupAnalytics } from "@v1/analytics/server";
import { ratelimit } from "@v1/kv/ratelimit";
import { serverCache } from "@v1/kv/server-cache";
import { CACHE_TTL } from "@v1/kv/utils";
import { logger } from "@v1/logger";
import { getAuthUser } from "@v1/supabase/queries/server";
import { createSupabaseClient } from "@v1/supabase/server";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

const handleServerError = (e: Error) => {
  console.error("Action error:", e.message);
  return e instanceof Error ? e.message : DEFAULT_SERVER_ERROR_MESSAGE;
};

export async function getActionClient() {
  return createSafeActionClient({
    handleServerError,
  });
}

export async function getActionClientWithMeta() {
  return createSafeActionClient({
    handleServerError,
    defineMetadataSchema() {
      return z.object({
        name: z.string(),
        track: z
          .object({
            event: z.string(),
            channel: z.string(),
          })
          .optional(),
      });
    },
  });
}

export async function getAuthActionClient() {
  const actionClientWithMeta = await getActionClientWithMeta();

  return actionClientWithMeta
    .use(async ({ next, clientInput, metadata }) => {
      const result = await next({ ctx: {} });

      if (process.env.NODE_ENV === "development") {
        logger.info(`Input -> ${JSON.stringify(clientInput)}`);
        logger.info(`Result -> ${JSON.stringify(result.data)}`);
        logger.info(`Metadata -> ${JSON.stringify(metadata)}`);
      }

      return result;
    })
    .use(async ({ next, metadata }) => {
      const ip = (await headers()).get("x-forwarded-for");
      const cacheKey = serverCache.generateKey("ratelimit", ip!, metadata.name);
      const cachedAttempts = await serverCache.get<number>(cacheKey);

      // Check rate limit from cache first
      if (cachedAttempts && cachedAttempts > 50) {
        throw new Error("Too many requests");
      }

      // Fallback to Upstash rate limiting
      const { success, remaining } = await ratelimit.general.limit(
        `${ip}-${metadata.name}`,
      );

      if (!success) {
        throw new Error("Too many requests");
      }

      // Update cache with explicit TTL type
      await serverCache.set(
        cacheKey,
        (cachedAttempts || 0) + 1,
        CACHE_TTL.SHORT,
      );

      return next({
        ctx: {
          ratelimit: {
            remaining,
          },
        },
      });
    })
    .use(async ({ next, metadata }) => {
      const userResponse = await getAuthUser();
      if (!userResponse) {
        throw new Error("User not found");
      }
      const {
        data: { user },
      } = userResponse;
      const supabase = createSupabaseClient();

      if (!user) {
        throw new Error("Unauthorized");
      }

      if (metadata?.track) {
        const analytics = await setupAnalytics({
          userId: user.id,
        });
        analytics.track(metadata.track);
      }

      return Sentry.withServerActionInstrumentation(metadata.name, async () => {
        return next({
          ctx: {
            supabase,
            user,
          },
        });
      });
    });
}

import { logger } from "@ren/logger";

import { redisClient } from "./client";
import { CACHE_TTL, type CacheTTL } from "./utils";

// Server-side cache implementation
export class ServerCache {
  private static instance: ServerCache;
  private constructor() {}

  static getInstance(): ServerCache {
    if (!ServerCache.instance) {
      ServerCache.instance = new ServerCache();
    }
    return ServerCache.instance;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get<T>(key);
      if (!data) {
        logger.debug(`Cache miss for key: ${key}`);
        return null;
      }
      logger.debug(`Cache hit for key: ${key}`);
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        logger.debug(`Cache miss for key: ${key}`);
        return null;
      }
      logger.error("Cache get error:", error);
      return null;
    }
  }

  async set(
    key: string,
    value: unknown,
    ttl: CacheTTL = CACHE_TTL.MEDIUM,
  ): Promise<void> {
    if (!value) return;

    try {
      // Ensure value is serializable
      const serializedValue = JSON.parse(JSON.stringify(value));

      // Use set for more precise TTL control (in milliseconds)
      await redisClient.set(
        key,
        ttl * 1000, // Convert seconds to milliseconds
        serializedValue,
      );

      logger.debug(`Cache set for key: ${key}, TTL: ${ttl}`);
    } catch (error) {
      logger.error("Cache set error:", error);
      // Attempt fallback to simple set if psetex fails
      try {
        await redisClient.set(key, value);
        await redisClient.expire(key, ttl);
        logger.debug(`Cache set (fallback) for key: ${key}, TTL: ${ttl}`);
      } catch (fallbackError) {
        logger.error("Cache set fallback error:", fallbackError);
      }
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await redisClient.del(key);
      logger.debug(`Cache deleted for key: ${key}`);
    } catch (error) {
      logger.error("Cache delete error:", error);
    }
  }

  generateKey(...parts: (string | undefined)[]): string {
    const validParts = parts.filter(
      (part): part is string => typeof part === "string" && part.length > 0,
    );
    return ["v1", "cache", ...validParts].join(":");
  }
}

export const serverCache = ServerCache.getInstance();

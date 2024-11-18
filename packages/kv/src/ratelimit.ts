import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { redisClient } from "./client";

// Implement a more granular rate limiting strategy
export const ratelimit = {
  // General API endpoints
  general: new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.fixedWindow(50, "10s"),
    prefix: "ratelimit:general",
  }),

  // Chat/AI endpoints (more restricted)
  chat: new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.fixedWindow(10, "10s"),
    prefix: "ratelimit:chat",
  }),

  // Schema operations
  schema: new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(20, "10s"),
    prefix: "ratelimit:schema",
  }),
};

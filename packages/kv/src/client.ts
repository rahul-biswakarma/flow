import { Redis } from "@upstash/redis";

// Validate Redis configuration
if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error(
    "Redis configuration missing. Please check UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.",
  );
}

// Create Redis client with proper REST configuration
export const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  automaticDeserialization: true,
});

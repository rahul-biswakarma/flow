// Cache TTL constants
export const CACHE_TTL = {
  SHORT: 60 as const, // 1 minute
  MEDIUM: 300 as const, // 5 minutes
  LONG: 3600 as const, // 1 hour
  VERY_LONG: 86400 as const, // 24 hours
} as const;

export type CacheTTL = (typeof CACHE_TTL)[keyof typeof CACHE_TTL];

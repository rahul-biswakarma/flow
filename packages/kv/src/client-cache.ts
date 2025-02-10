import { logger } from "@ren/logger";
import { CACHE_TTL, type CacheTTL } from "./utils";

// Client-side cache implementation using Map with LRU eviction
export class ClientCache {
  private static instance: ClientCache;
  private cache: Map<string, { value: unknown; expires: number }>;
  private maxSize = 100; // Maximum number of items to store

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): ClientCache {
    if (!ClientCache.instance) {
      ClientCache.instance = new ClientCache();
    }
    return ClientCache.instance;
  }

  get<T>(key: string): T | null {
    try {
      const item = this.cache.get(key);
      if (!item) return null;

      if (Date.now() > item.expires) {
        this.delete(key);
        return null;
      }

      // Move accessed item to the end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, item);

      return item.value as T;
    } catch (error) {
      logger.error("Client cache get error:", error);
      return null;
    }
  }

  set(key: string, value: unknown, ttl: CacheTTL = CACHE_TTL.MEDIUM): void {
    if (!value) return;

    try {
      // Implement LRU eviction
      if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        firstKey && this.cache.delete(firstKey);
      }

      this.cache.set(key, {
        value,
        expires: Date.now() + ttl * 1000,
      });
    } catch (error) {
      logger.error("Client cache set error:", error);
    }
  }

  delete(key: string): void {
    try {
      this.cache.delete(key);
    } catch (error) {
      logger.error("Client cache delete error:", error);
    }
  }

  generateKey(...parts: (string | undefined)[]): string {
    const validParts = parts.filter(
      (part): part is string => typeof part === "string" && part.length > 0,
    );
    return ["v1", "client", ...validParts].join(":");
  }

  clear(): void {
    this.cache.clear();
  }
}

export const clientCache = ClientCache.getInstance();

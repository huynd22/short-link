import { Redis } from "@upstash/redis";

// Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from env.
// On Vercel, add the Upstash integration or set these two env vars.
export const redis = Redis.fromEnv();

// Prefix so keys don't collide with anything else in the same DB.
export const key = (code: string) => `link:${code}`;

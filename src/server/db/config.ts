/**
 * Database configuration loader
 *
 * Reads the connection string from the standard DATABASE_URL environment
 * variable (works out of the box on Render, Railway, Vercel Postgres, etc).
 */
import { env } from 'node:process';

/**
 * Returns the Postgres connection string, or undefined if not configured.
 * Intentionally does NOT throw at import time so the app (and the Vite
 * build) can still start/build without a database attached.
 */
export function getDatabaseUrl(): string | undefined {
  return env.DATABASE_URL;
}

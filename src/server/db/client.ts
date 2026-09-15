/**
 * Database connection setup using Drizzle ORM with PostgreSQL (node-postgres)
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { getDatabaseUrl } from './config';
import * as schema from './schema';

const connectionString = getDatabaseUrl();

// Create Postgres connection pool. If DATABASE_URL isn't set (e.g. during
// a frontend-only build), the pool is created lazily and simply fails on
// first query rather than crashing at import time.
const pool = new pg.Pool(
  connectionString
    ? {
        connectionString,
        ssl: connectionString.includes('localhost')
          ? false
          : { rejectUnauthorized: false },
      }
    : { connectionString: 'postgres://invalid/invalid' }
);

// Create Drizzle instance
export const db = drizzle(pool, { schema });

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch {
    return false;
  }
}

/**
 * Close database connection pool
 */
export async function closeConnection(): Promise<void> {
  await pool.end();
}

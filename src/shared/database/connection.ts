import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schemas';
import { serverOnly } from './server-only';

// Ensure this only runs on server
serverOnly();

// Create the connection
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// Create postgres client (server-side only)
const client = postgres(connectionString, {
  max: 1,
  ssl: process.env.NODE_ENV === 'production'
});

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export the client for migrations
export { client };

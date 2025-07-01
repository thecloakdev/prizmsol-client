import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: '.env' });

// set database connection string based on environment
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

const url = {
    production: process.env.DATABASE_URL as string,
    development: process.env.DATABASE_URL_DEV as string,
}

const client = postgres(url.production);
export const db = drizzle(client);

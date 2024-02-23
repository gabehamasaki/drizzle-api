import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schemas/',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: 'localhost',
    user: 'gabriel',
    password: '038221',
    database: 'clouddrizzle',
  },
} satisfies Config;
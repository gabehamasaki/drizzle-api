import env from '@/utils/env';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schemas/',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_DB,
  },
} satisfies Config;
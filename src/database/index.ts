import env from "@/utils/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from 'pg'

export const client = new Client({
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  user: env.DATABASE_USER,
  password:  env.DATABASE_PASSWORD,
  database: env.DATABASE_DB,
})

await client.connect();

export const db = drizzle(client)
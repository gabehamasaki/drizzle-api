import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from 'pg'

export const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'gabriel',
  password: '038221',
  database: 'clouddrizzle',
})

await client.connect()
export const db = drizzle(client)
import { migrate as pgMigrate } from 'drizzle-orm/node-postgres/migrator';
import { client, db } from '.';
import type { FastifyInstance } from 'fastify';

export default async function migrate(app: FastifyInstance) {
  app.log.info('Migrating database...')
  await pgMigrate(db, {
    migrationsFolder: './drizzle',
  })

  await client.end();
}
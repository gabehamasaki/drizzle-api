import Fastify from 'fastify'
import fs from 'fs'
import env from '@/utils/env';
import logger from '@/utils/log';
import errorHandler from './utils/error';
import migrate from './database/migrate';

// Application logger
const app = Fastify({
  logger
});

// Application error handler
app.setErrorHandler((error, request, reply) => errorHandler(app, error, request, reply));

app.addHook('onReady', async () => {
  await migrate(app);
});

// Dynamic import routes
fs.readdirSync('./src/routes/').forEach(file => {
  const route = import(`@/routes/${file}`)
  app.register(route)
})


app.listen({
  port: env.PORT,
})


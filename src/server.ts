import Fastify from 'fastify'
import fs from 'fs'
import env from '@/utils/env';
import logger from '@/utils/log';

const app = Fastify({
  logger
});


// Dynamic import routes
fs.readdirSync('./src/routes/').forEach(file => {
  const route = import(`@/routes/${file}`)
  app.register(route)
})


app.listen({
  port: Number(env.PORT),
})


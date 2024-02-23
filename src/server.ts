import Fastify from 'fastify'
import fs from 'fs'
import env from '@/utils/env';

const app = Fastify();

// Dynamic import routes
fs.readdirSync('./src/routes/').forEach(file => {
  const route = import(`@/routes/${file}`)
  app.register(route)
})


app.listen({
  port: Number(env.PORT),
}, () => console.log(`Server is running on port ${env.PORT}`))


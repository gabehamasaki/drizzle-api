import Fastify from 'fastify'
import fs from 'fs'

const app = Fastify();

// Dynamic import routes
fs.readdirSync('./src/routes/').forEach(file => {
  const route = import(`@/routes/${file}`)
  app.register(route)
})


app.listen({
  port: Number(Bun.env.PORT) || 3333,
}, () => console.log('Server is running on port 3333'))


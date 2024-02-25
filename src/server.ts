import Fastify from 'fastify'
import env from '@/utils/env';
import migrate from './database/migrate';
import getUsers from './routes/get-users';
import createUser from './routes/create-user';
import editUser from './routes/edit-user';
import showUser from './routes/show-user';

// Application logger
const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: true,
        ignore: 'pid,hostname,reqId,responseTime,res,req',
        messageFormat: '{if req.method}{req.method} - {end} {if req.url} {req.url} - {end} {if res.statusCode} StatusCode: {res.statusCode} - {end}{msg}'
      }
    },
  }
});

// Application error handler
app.setErrorHandler((error, request, reply) => {
  if (error.name == 'ZodError') {
    return reply.status(400).send({
      statusCode: 400,
      errors: JSON.parse(error.message)
    });
  }

  if (error.name) {
    app.errorHandler(error, request, reply);
  }
});

// Application routes
app.register(async (app) => {
  app.register(getUsers);
  app.register(createUser);
  app.register(editUser);
  app.register(showUser);

}, {
  prefix: '/api/v1'
})


app.listen({
  port: env.PORT,
})


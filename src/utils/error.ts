import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function errorHandler(app: FastifyInstance, error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  if (error.name == 'ZodError') {
    return reply.status(400).send({
      statusCode: 400,
      errors: JSON.parse(error.message)
    });
  }

  return app.errorHandler(error, request, reply);
}
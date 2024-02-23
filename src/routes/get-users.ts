import type { FastifyInstance } from "fastify";
import { db } from "@/database";
import { users as usersSchema } from "@models/users";

export default async function getUsers(app: FastifyInstance) {
  app.get("/users", async (request, reply) => {
    const users = await db.select({
      id: usersSchema.id,
      name: usersSchema.name,
      email: usersSchema.email,
    }).from(usersSchema);
    return reply.status(200).send({
      data: {
        users
      }
    });
  })
}
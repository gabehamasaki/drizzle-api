import type { FastifyInstance } from "fastify";
import { db } from "@/database";
import { users as usersSchema } from "@models/users";
import { z } from "zod";
import { eq } from "drizzle-orm";

export default async function showUser(app: FastifyInstance) {
  app.get("/users/:id", async (request, reply) => {
    const showUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = showUserParamsSchema.parse(request.params);

    const user = await db.select({
      id: usersSchema.id,
      name: usersSchema.name,
      email: usersSchema.email,
    }).from(usersSchema).where(eq(usersSchema.id, id)).limit(1);

    if (!user[0]) {
      return reply.status(404).send({
        error: "User not found",
      });
    }

    return reply.status(200).send({
      data: {
        user: user[0],
      }
    });
  })
}
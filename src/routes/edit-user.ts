import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "@/database";
import { users } from "@models/users";
import hash from "@/utils/hash";
import { eq } from "drizzle-orm";

export default async function editUser(app: FastifyInstance) {
  app.patch("/users/:id", async (request, reply) => {

    const editUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = editUserParamsSchema.parse(request.params);

    const editUserBodySchema = z.object({
      name: z.string().nullable(),
      email: z.string().email().nullable(),
      password: z.string().nullable(),
    })
    const { email, name, password } = editUserBodySchema.parse(request.body);

    if (email) {
      const alreadyExistEmail = await db.select({ email: users.email }).from(users).where(eq(users.email, email)).limit(1);
      if (alreadyExistEmail[0]) {
        return reply.status(400).send({ error: "Email already exists" });
      }
    }

    await db.update(users).set({
      email: email ?? undefined,
      name: name ?? undefined,
      password: password ? await hash(password) : undefined,
    }).where(eq(users.id, id))

    reply.status(200).send({ message: `User ${id} successfully updated` });
  }
  );
}
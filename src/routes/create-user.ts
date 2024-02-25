import type { FastifyInstance } from "fastify";
import { db } from "@/database";
import { userInsertSchema, users } from "@models/users";
import hash from "@/utils/hash";

export default async function createUser(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    const { name, email, password } = userInsertSchema.parse(request.body);
    // Create user
    try {
      await db.insert(users).values({
        name,
        email,
        password: await hash(password),
      })
    } catch (error) {
      return reply.status(400).send({ error: "Error to create user" });
    }

    return reply.status(201).send({ message: "User created" });
  })
}
import { z } from "zod";

const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_DB: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
})

const env = envSchema.parse(process.env);

export default env;
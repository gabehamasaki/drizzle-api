import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default('3333').transform((val) => Number(val)),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform((val) => Number(val)),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
})

const env = envSchema.parse(process.env);

export default env;
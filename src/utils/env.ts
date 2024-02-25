import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default('3333').transform((val) => Number(val)),
  // Databases
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform((val) => Number(val)),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  // Cloudflare R2
  CLOUDFLARE_ENDPOINT: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
})

const env = envSchema.parse(process.env);

export default env;
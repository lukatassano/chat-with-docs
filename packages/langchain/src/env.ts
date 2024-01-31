import { z } from "zod";

const envSchema = z.object({
  VECTOR_DB_URL: z.string().min(1),
  COLLECTION: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);

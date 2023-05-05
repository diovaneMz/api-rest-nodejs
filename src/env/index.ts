import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variable \n', JSON.stringify(_env.error.format(), null, 2), '\n');

  throw new Error('Invalid environment variable');
}

export const env = _env.data;
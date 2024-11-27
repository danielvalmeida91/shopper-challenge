import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config({
  path: path.resolve(__dirname, '../../../.env')
})

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().default('postgresql://docker:docker@localhost:5432/mydb?schema=shopper-challenge'),
  GOOGLE_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data


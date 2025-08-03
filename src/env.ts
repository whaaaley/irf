import denoConfig from '../deno.json' with { type: 'json' }

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

if (!OPENAI_API_KEY) {
  throw new Error(`Missing required environment variable: OPENAI_API_KEY`)
}

export const env = {
  OPENAI_API_KEY,
  VERSION: denoConfig.version,
} as const

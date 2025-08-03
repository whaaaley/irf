import { createChatPrompt, createLlmExecutor, createParser, useLlm } from 'llm-exe'
import { z } from 'zod'
import { env } from './env.ts'
import { ParsedRule, ParsedSchema, RuleSchema } from './schema.ts'

const config = {
  llm: {
    provider: 'openai.gpt-4o-mini',
    options: {
      temperature: 0,
      seed: Date.now(),
      openAIApiKey: env.OPENAI_API_KEY,
    },
  },
} as const

export const generateParsedRules = (input: string) => {
  const formatterInstructions = [
    'You are a rule parser that converts raw instructions into structured parsed rules.',
    'Take the provided instructions and break them down into structured components.',
    'Each rule should have: strength (obligatory/forbidden/etc), action, target, context (optional), and reason.',
    'Focus on extracting the core components without adding extra details.',
  ].join('\n')

  const systemPrompt = [
    formatterInstructions,
    'Instructions to parse:',
    input,
  ].join('\n\n')

  const prompt = createChatPrompt(systemPrompt)

  // Use ParsedSchema which is an array of parsed rules
  const outputSchema = z.object({ rules: ParsedSchema })
  const parser = createParser('json', { schema: z.toJSONSchema(outputSchema) })

  const llm = useLlm(config.llm.provider, config.llm.options)
  const executor = createLlmExecutor({ llm, prompt, parser })

  return executor.execute({})
}

export const generateRules = (parsedRules: ParsedRule[]) => {
  const formatterInstructions = [
    'You are a rule formatter that converts structured parsed rules into human-readable rules.',
    'Take the provided parsed rule components and create natural language versions.',
    'Each human-readable rule should directly correspond to the parsed components without adding extra details.',
    'Make the rules clear, concise, and actionable.',
  ].join('\n')

  const systemPrompt = [
    formatterInstructions,
    'Parsed rules to convert:',
    JSON.stringify(parsedRules, null, 2),
  ].join('\n\n')

  const prompt = createChatPrompt(systemPrompt)

  // Array of human-readable rule strings
  const outputSchema = z.object({ rules: z.array(RuleSchema) })
  const parser = createParser('json', { schema: z.toJSONSchema(outputSchema) })

  const llm = useLlm(config.llm.provider, config.llm.options)
  const executor = createLlmExecutor({ llm, prompt, parser })

  return executor.execute({})
}

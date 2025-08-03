import { z } from 'zod'

// Deontic strength categories - how strongly the rule should be followed
export const StrengthSchema = z.enum([
  'obligatory', // required
  'permissible', // allowed
  'forbidden', // banned
  'optional', // choice
  'supererogatory', // heroic
  'indifferent', // neutral
  'omissible', // skippable
])
  .describe('How strongly this rule should be enforced')
// .meta({
//   examples: {
//     obligatory: 'must use return await when returning promises',
//     permissible: 'may use either grep or find as appropriate',
//     forbidden: 'never use type assertions anywhere',
//     optional: 'adding commit body is your choice',
//     supererogatory: 'comprehensive documentation beyond requirements',
//     indifferent: 'choice of variable naming style',
//     omissible: 'post-task explanations can be omitted',
//   },
// })

export const ActionSchema = z.string()
  .describe('The action verb that describes what to do')
  .meta({
    examples: ['use', 'avoid', 'format', 'follow', 'keep', 'combine', 'search', 'ask'],
  })

export const TargetSchema = z.string()
  .describe('What the action applies to - the object of the rule')
  .meta({
    examples: ['commit messages', 'type assertions', 'command line tools', 'file operations', 'code formatting', 'user instructions'],
  })

export const ContextSchema = z.string()
  .describe('When, where, or under what conditions this rule applies')
  .meta({
    examples: ['before removing files', 'in async functions', 'when returning promises', 'for new features', 'under 50 characters', 'if unclear'],
  })

export const ReasonSchema = z.string()
  .describe('Why this rule exists - the justification or benefit')
  .meta({
    examples: ['prevents data loss', 'better stack traces', 'consistent code style', 'automated tooling', 'accurate execution', 'clear completion signal'],
  })

// Structured rule components for AI processing
export const ParsedRuleSchema = z.object({
  strength: StrengthSchema,
  action: ActionSchema,
  target: TargetSchema,
  context: ContextSchema.optional(),
  reason: ReasonSchema,
})
  .describe('Structured breakdown of a rule for AI processing')
  .meta({
    examples: [{
      strength: 'obligatory',
      action: 'use',
      target: 'return await',
      context: 'when returning promises from async functions',
      reason: 'better stack traces and error handling',
    }, {
      strength: 'forbidden',
      action: 'use',
      target: 'type assertions',
      context: 'anywhere',
      reason: 'maintains type safety',
    }, {
      strength: 'obligatory',
      action: 'ask',
      target: 'confirmation',
      context: 'before removing files',
      reason: 'prevents accidental data loss',
    }, {
      strength: 'obligatory',
      action: 'follow',
      target: 'user instructions',
      context: 'exactly',
      reason: 'accurate execution',
    }, {
      strength: 'obligatory',
      action: 'reply',
      target: 'Done',
      context: 'after completing tasks',
      reason: 'clear completion signal',
    }],
  })

// Human-readable rule schema
export const RuleSchema = z.string()
  .describe('The rule expressed in natural human language')
  .meta({
    examples: [
      'Use return await when returning promises from async functions for better stack traces and error handling',
      'Do not use type assertions anywhere to maintain type safety',
      'Ask for confirmation before removing files to prevent accidental data loss',
      'Follow user instructions exactly for accurate execution',
      'Reply "Done" after completing tasks for clear completion signal',
    ],
  })

// Schema for array of parsed rules
export const ParsedSchema = z.array(ParsedRuleSchema)
  .describe('Array of structured parsed rules')

// Helper types
export type Rule = z.infer<typeof RuleSchema>
export type ParsedRule = z.infer<typeof ParsedSchema>
export type Strength = z.infer<typeof StrengthSchema>

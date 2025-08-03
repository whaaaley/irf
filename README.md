# Instruction Rule Formatter (IRF)

A tool that converts unstructured instruction text into structured, parseable rules using AI, grounded in speech act theory and deontic logic.

## Disclaimer

I'm not an NLP expert - I did some research to learn a bit more theory on NLP and stumbled onto speech act theory and deontic logic and thought it could be a good fit for instructions.
I was annoyed trying to write consistent rules, thinking about phrasing and grammar, so I thought there might be a better way to approach this systematically.
This project is just me experimenting with these concepts to see if they can help structure and standardize instruction text.
The implementation may not perfectly align with academic definitions, but the goal is practical utility in organizing rule-based content.

## Theoretical Foundation

IRF is inspired by **[speech act theory](https://en.wikipedia.org/wiki/Speech_act)** and **[deontic logic](https://en.wikipedia.org/wiki/Deontic_logic)** to analyze and structure instructions:

### Speech Act Theory

Instructions contain **performative utterances** (statements that create rules) that don't just describe but actively create "obligations", "permissions", and "prohibitions".
IRF identifies the **illocutionary force** (the intended action or effect) of each instruction by extracting:

- **Action verbs** (use, avoid, ensure, require)
- **Target objects** (what the action applies to)
- **Contextual conditions** (when/where the rule applies)
- **Justifications** (why the rule exists)

### Deontic Logic

IRF categorizes rules using **deontic strength** categories that express different types of rule relationships:

- **Obligatory** - Required actions that create strong obligations
- **Forbidden** - Prohibited actions with clear boundaries
- **Permissible** - Allowed actions within acceptable bounds
- **Optional** - Discretionary choices left to the actor
- **Supererogatory** - Actions that exceed normal expectations
- **Indifferent** - Actions with no normative preference
- **Omissible** - Actions that can be reasonably omitted

This theoretical grounding enables IRF to find hidden rule structures in instructions and make them clear and consistent.

## Overview

IRF takes raw instruction files and processes them through a two-step AI pipeline:

1. **Parse**: Converts raw text into structured rule components (strength, action, target, context, reason)
2. **Format**: Converts structured rules back into clean, human-readable text

This process helps standardize instruction formats, reduce verbosity, and create machine-readable rule structures.

<br/>
<br/>
<br/>

## Project Structure

```
src/
├── schema.ts      # Zod schemas for rules and parsed data
├── main.ts        # Core AI processing functions
├── build.ts       # Batch processing script
├── analyze.ts     # File size comparison tool
└── env.ts         # Environment configuration

fixtures/          # Input instruction files
dist/              # Generated output files
```

## Installation

1. Ensure you have Deno installed
2. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your_api_key_here
   ```

## Usage

### Process All Files

Convert all instruction files in the `fixtures/` directory:

```bash
deno run --allow-read --allow-write --allow-env src/build.ts
```

This generates three files for each input:
- `.md` - Clean human-readable rules
- `.parsed.json` - Structured rule components
- `.rules.json` - Raw AI-generated rules

### Analyze Results

Compare original vs generated file sizes:

```bash
deno run --allow-read src/analyze.ts
```

Example output:
```
📊 File Size Analysis: Fixtures vs Generated Markdown

File                     Original   Generated    Diff    Change
─────────────────────────────────────────────────────────────────
copilot.instructions          1756        1158    598  🟢 −34.1%
audit.instructions            1235         692    543  🟢 −44.0%
git.instructions              1880        1722    158  🟢 −8.4%
old.instructions               937        1070   -133  🔴 +14.2%
project.instructions          1102        1221   -119  🔴 +10.8%
─────────────────────────────────────────────────────────────────
TOTAL                         6910        5863   1047  🟢 −15.2%

📈 Summary: SAVED 1047 bytes (15.2%)
```

## Rule Schema

### Parsed Rule Structure
```typescript
type ParsedRule = {
  strength: 'obligatory' | 'forbidden' | 'permissible' | 'optional' | 'supererogatory' | 'indifferent' | 'omissible'
  action: string        // e.g., 'use', 'avoid', 'format'
  target: string        // e.g., 'return await', 'type assertions'
  context?: string      // e.g., 'when returning promises'
  reason: string        // e.g., 'better stack traces'
}
```

### Example Transformation

**Input (raw text):**
```
Always use return await when returning promises from async functions. This provides better stack traces and error handling.
```

**Parsed structure:**
```json
{
  "strength": "obligatory",
  "action": "use",
  "target": "return await",
  "context": "when returning promises from async functions",
  "reason": "better stack traces and error handling"
}
```

**Generated rule:**
```
Use return await when returning promises from async functions for better stack traces and error handling.
```

## API

### `generateParsedRules(input: string)`
Converts raw instruction text into structured parsed rules.

### `generateRules(parsedRules: ParsedRule[])`
Converts structured rules into human-readable text.

## Performance

The tool typically achieves:
- **15-45% size reduction** for verbose instruction files
- **Consistent formatting** across all outputs
- **Structured data** for programmatic processing

Files that are already well-structured may see slight increases (10-15%) as the AI adds connecting phrases for clarity.

## Dependencies

- **Deno**: Runtime environment
- **Zod**: Schema validation
- **llm-exe**: AI processing pipeline
- **fast-glob**: File pattern matching

## TODO

- [ ] **CLI Tool** - Create a command-line interface for easier single-file processing
- [ ] **MCP Tool** - Implement as a Model Context Protocol tool for integration with AI assistants
- [ ] **Rule Merging** - Combine similar rules to reduce redundancy
- [ ] **Combine Similar Rules** - Ability to combine similar rules into one rule
- [ ] **Split Rules** - Ability to split a single rule up into multiple rules
- [ ] **Confidence Scoring** - Add confidence scores to parsed rule components
- [ ] **Deontic Ordering** - Sort rules by deontic strength (Obligatory → Forbidden → Permissible → Optional → Supererogatory → Indifferent → Omissible)

## License

MIT

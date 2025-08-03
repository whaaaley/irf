import { ensureDir } from '@std/fs'
import { dirname, join } from '@std/path'
import fg from 'fast-glob'
import { generateParsedRules, generateRules } from './main.ts'
import { ParsedRule } from './schema.ts'

type ParsedRulesResult = { rules: ParsedRule[] }
type RulesResult = { rules: string[] }

const isValidParsedRulesResult = (result: unknown): result is ParsedRulesResult => {
  return result !== null &&
    typeof result === 'object' &&
    'rules' in result &&
    Array.isArray(result.rules)
}

const isValidRulesResult = (result: unknown): result is RulesResult => {
  return result !== null &&
    typeof result === 'object' &&
    'rules' in result &&
    Array.isArray(result.rules)
}

const processFiles = async () => {
  // List files in fixtures/cynthia
  const cynthiaFiles = await fg(['fixtures/cynthia/**/*'], { onlyFiles: true })
  console.log('Files in fixtures/cynthia:')
  cynthiaFiles.forEach((file) => console.log(file))

  // Convert all files in fixtures
  const allFiles = await fg(['fixtures/**/*'], { onlyFiles: true })

  // Ensure dist directory exists
  await ensureDir('dist')

  for (const filePath of allFiles) {
    const content = await Deno.readTextFile(filePath)

    // Step 1: Generate parsed rules
    const parsedResult = await generateParsedRules(content)

    // Validate the parsed result structure
    if (!isValidParsedRulesResult(parsedResult)) {
      console.error(`Invalid result from generateParsedRules for file: ${filePath}`)
      continue
    }

    // Step 2: Generate human-readable rules from parsed rules
    const rulesResult = await generateRules(parsedResult.rules)

    // Validate the rules result structure
    if (!isValidRulesResult(rulesResult)) {
      console.error(`Invalid result from generateRules for file: ${filePath}`)
      continue
    }

    // Format human-readable rules as markdown
    const rulesMarkdown = rulesResult.rules.join('\n\n')

    // Create output paths preserving directory structure
    const baseName = filePath.replace('fixtures/', '').replace(/\.[^.]+$/, '')
    const outputDir = dirname(join('dist', baseName))
    await ensureDir(outputDir)

    const markdownPath = join('dist', `${baseName}.md`)
    const parsedJsonPath = join('dist', `${baseName}.parsed.json`)
    const rulesJsonPath = join('dist', `${baseName}.rules.json`)

    // Write all output files
    await Deno.writeTextFile(markdownPath, rulesMarkdown)
    await Deno.writeTextFile(parsedJsonPath, JSON.stringify(parsedResult, null, 2))
    await Deno.writeTextFile(rulesJsonPath, JSON.stringify(rulesResult, null, 2))
  }

  // Output all files to dist/*
  const outputFiles = await fg(['dist/**/*'], { onlyFiles: true })
  console.log('Output files in dist:')
  outputFiles.forEach((file) => console.log(file))
}

processFiles()

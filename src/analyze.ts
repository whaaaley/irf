import { basename } from '@std/path'
import fg from 'fast-glob'

type ComparisonResult = {
  file: string
  originalBytes: number
  generatedBytes: number
  difference: number
  savings: boolean
  percentChange: number
}

const analyzeFiles = async () => {
  // Get all fixture files
  const fixtureFiles = await fg(['fixtures/**/*'], { onlyFiles: true })

  const results: ComparisonResult[] = []

  for (const fixturePath of fixtureFiles) {
    // Calculate corresponding dist markdown path
    const baseName = fixturePath.replace('fixtures/', '').replace(/\.[^.]+$/, '')
    const distMarkdownPath = `dist/${baseName}.md`

    try {
      // Read original fixture file
      const originalContent = await Deno.readTextFile(fixturePath)
      const originalBytes = new TextEncoder().encode(originalContent).length

      // Read generated markdown file
      const generatedContent = await Deno.readTextFile(distMarkdownPath)
      const generatedBytes = new TextEncoder().encode(generatedContent).length

      // Calculate difference and percentage
      const difference = originalBytes - generatedBytes
      const savings = difference > 0
      const percentChange = (difference / originalBytes) * 100

      results.push({
        file: basename(fixturePath),
        originalBytes,
        generatedBytes,
        difference,
        savings,
        percentChange,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`Error processing ${fixturePath}:`, errorMessage)
    }
  }

  // Sort by absolute difference (largest changes first)
  results.sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))

  // Display results
  console.log('\n📊 File Size Analysis: Fixtures vs Generated Markdown\n')
  console.log('File'.padEnd(25) + 'Original'.padStart(10) + 'Generated'.padStart(12) + 'Diff'.padStart(8) + 'Change'.padStart(10))
  console.log('─'.repeat(65))

  let totalOriginal = 0
  let totalGenerated = 0

  for (const result of results) {
    totalOriginal += result.originalBytes
    totalGenerated += result.generatedBytes

    const changeStr = result.savings ? `−${result.percentChange.toFixed(1)}%` : `+${Math.abs(result.percentChange).toFixed(1)}%`

    const changeColor = result.savings ? '🟢' : '🔴'

    console.log(
      result.file.padEnd(25) +
        result.originalBytes.toString().padStart(10) +
        result.generatedBytes.toString().padStart(12) +
        result.difference.toString().padStart(8) +
        `${changeColor} ${changeStr}`.padStart(12),
    )
  }

  // Summary
  console.log('─'.repeat(65))
  const totalDifference = totalOriginal - totalGenerated
  const totalPercentChange = (totalDifference / totalOriginal) * 100
  const totalSavings = totalDifference > 0

  console.log(
    'TOTAL'.padEnd(25) +
      totalOriginal.toString().padStart(10) +
      totalGenerated.toString().padStart(12) +
      totalDifference.toString().padStart(8) +
      `${totalSavings ? '🟢' : '🔴'} ${totalSavings ? '−' : '+'}${Math.abs(totalPercentChange).toFixed(1)}%`.padStart(12),
  )

  console.log(`\n📈 Summary: ${totalSavings ? 'SAVED' : 'INCREASED'} ${Math.abs(totalDifference)} bytes (${Math.abs(totalPercentChange).toFixed(1)}%)`)
}

analyzeFiles()

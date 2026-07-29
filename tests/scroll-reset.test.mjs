import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const legacyScriptUrl = new URL(
  '../public/legacy/js/script.js',
  import.meta.url,
)

test('refresh does not start a forced scroll-to-top animation', async () => {
  const source = await readFile(legacyScriptUrl, 'utf8')

  assert.doesNotMatch(
    source,
    /animate\(\{\s*scrollTop:\s*0\s*\},\s*1000\s*\)/,
  )
})

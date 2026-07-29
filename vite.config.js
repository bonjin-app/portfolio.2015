import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const legacyMarkupId = 'virtual:legacy-portfolio-markup'
const resolvedLegacyMarkupId = `\0${legacyMarkupId}`
const legacyMarkupPath = fileURLToPath(
  new URL('./public/legacy/index.html', import.meta.url),
)

function legacyMarkupPlugin() {
  return {
    name: 'legacy-portfolio-markup',
    resolveId(id) {
      return id === legacyMarkupId ? resolvedLegacyMarkupId : null
    },
    async load(id) {
      if (id !== resolvedLegacyMarkupId) return null

      const html = await readFile(legacyMarkupPath, 'utf8')
      return `export default ${JSON.stringify(html)}`
    },
  }
}

export default defineConfig({
  plugins: [legacyMarkupPlugin(), react(), tailwindcss()],
})

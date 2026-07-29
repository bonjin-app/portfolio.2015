import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

async function readProjectFile(path) {
  return readFile(resolve(projectRoot, path), 'utf8')
}

test('legacy markup is bundled and ready before React mounts', async () => {
  const mainSource = await readProjectFile('src/main.jsx')
  const legacySource = await readProjectFile('src/legacy.js')
  const bundledLegacy = await readProjectFile('src/legacy-index.html')
  const publicLegacy = await readProjectFile('public/legacy/index.html')

  assert.match(mainSource, /initialMarkup = loadLegacyMarkup\(\)/)
  assert.ok(
    mainSource.indexOf('loadLegacyMarkup()') < mainSource.indexOf('createRoot('),
  )
  assert.match(mainSource, /flushSync\(\(\) =>/)
  assert.doesNotMatch(mainSource, /await loadLegacyMarkup/)
  assert.doesNotMatch(legacySource, /fetch\(/)
  assert.match(legacySource, /from '\.\/legacy-index\.html\?raw'/)
  assert.equal(bundledLegacy, publicLegacy)
})

test('main portfolio exposes landmarks and named icon controls', async () => {
  const source = await readProjectFile('public/legacy/index.html')

  assert.match(source, /<main class="page-sections">/)
  assert.match(source, /class="side-logo" aria-label="홈으로 이동"/)
  assert.match(source, /class="lt-1" aria-label="메뉴 열기"/)
  assert.match(source, /class="lt-2" aria-label="화면 상단으로 이동"/)
  assert.match(source, /COPYRIGHT &copy; 2015/)
  assert.doesNotMatch(source, /COPYLIGHT/)
})

test('mobile AutoCamping references existing restored assets', async () => {
  const htmlPath = resolve(
    projectRoot,
    'public/legacy/html/Web_renew_m/index.html',
  )
  const cssPath = resolve(
    projectRoot,
    'public/legacy/html/Web_renew_m/css/moblie.css',
  )
  const html = await readFile(htmlPath, 'utf8')
  const css = await readFile(cssPath, 'utf8')

  assert.doesNotMatch(html, /images\/images\//)
  assert.doesNotMatch(css, /images\/images\//)

  const htmlAssets = Array.from(
    html.matchAll(/src="(\.\.\/Web_renew\/[^"]+)"/g),
    (match) => match[1],
  )
  const cssAssets = Array.from(
    css.matchAll(/url\((\.\.\/\.\.\/Web_renew\/[^)]+)\)/g),
    (match) => match[1],
  )

  assert.equal(htmlAssets.length, 7)
  assert.equal(cssAssets.length, 3)

  await Promise.all(
    htmlAssets.map((path) => access(resolve(dirname(htmlPath), path))),
  )
  await Promise.all(
    cssAssets.map((path) => access(resolve(dirname(cssPath), path))),
  )
})

test('Jinmyung detail page has a useful title and valid viewport keys', async () => {
  const source = await readProjectFile(
    'public/legacy/html/jinmyung/index.html',
  )

  assert.match(source, /<title>진명홈바스 반응형 웹<\/title>/)
  assert.doesNotMatch(source, /maximun-scale|minimun-scale/)
})

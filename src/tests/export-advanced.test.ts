import test from 'node:test'
import assert from 'node:assert'
import { exportToJSONEnhanced } from '../lib/export-advanced.ts'

test('exportToJSONEnhanced', async (t) => {
  let createdBlob: any = null
  let createdUrl = ''
  let clicked = false
  let downloadedFilename = ''

  // Mock globals
  const originalBlob = global.Blob
  const originalURL = global.URL
  const originalDocument = global.document

  t.beforeEach(() => {
    createdBlob = null
    createdUrl = ''
    clicked = false
    downloadedFilename = ''

    global.Blob = class Blob {
      constructor(parts: any[], options: any) {
        createdBlob = { parts, options }
      }
    } as any

    global.URL.createObjectURL = (blob: any) => {
      createdUrl = 'blob:mock-url'
      return createdUrl
    }

    global.URL.revokeObjectURL = () => {}

    global.document = {
      createElement: (tag: string) => {
        if (tag === 'a') {
          return {
            set download(val: string) { downloadedFilename = val },
            get download() { return downloadedFilename },
            href: '',
            click: () => { clicked = true }
          }
        }
        return {}
      }
    } as any
  })

  t.afterEach(() => {
    global.Blob = originalBlob
    global.URL = originalURL
    global.document = originalDocument
  })

  await t.test('formats correctly with nodes', () => {
    const nodes = {
      'root': { id: 'root', text: 'Central Idea', color: '#ff0000', children: ['node1'] },
      'node1': { id: 'node1', text: 'Child 1', color: '#00ff00', children: [] }
    }

    exportToJSONEnhanced(nodes, 'my-mindmap')

    assert.ok(clicked, 'Link should have been clicked to trigger download')
    assert.strictEqual(downloadedFilename, 'my-mindmap.json', 'Filename should be correct')
    assert.strictEqual(createdBlob.options.type, 'application/json', 'Blob should be application/json')

    const parsedData = JSON.parse(createdBlob.parts[0])

    // Verify metadata
    assert.strictEqual(parsedData.version, '2.0')
    assert.ok(parsedData.metadata.exportedAt)
    assert.strictEqual(parsedData.metadata.generator, 'Beautiful Mindmap SaaS')

    // Verify structure
    assert.deepStrictEqual(parsedData.nodes, nodes)
  })

  await t.test('handles empty nodes gracefully', () => {
    exportToJSONEnhanced({})

    assert.ok(clicked)
    assert.strictEqual(downloadedFilename, 'mindmap.json') // default filename

    const parsedData = JSON.parse(createdBlob.parts[0])

    // Verify metadata
    assert.strictEqual(parsedData.version, '2.0')
    assert.ok(parsedData.metadata.exportedAt)
    assert.strictEqual(parsedData.metadata.generator, 'Beautiful Mindmap SaaS')

    // Verify structure
    assert.deepStrictEqual(parsedData.nodes, {})
  })

  await t.test('respects filename parameter', () => {
    exportToJSONEnhanced({}, 'custom-filename')

    assert.ok(clicked)
    assert.strictEqual(downloadedFilename, 'custom-filename.json')
  })
})

import { test, describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { exportToMarkdown } from '../src/lib/export-advanced.ts';

describe('exportToMarkdown', () => {
  let originalCreateObjectURL: typeof URL.createObjectURL;
  let originalRevokeObjectURL: typeof URL.revokeObjectURL;

  before(() => {
    // Mock global objects used by exportToMarkdown
    originalCreateObjectURL = URL.createObjectURL;
    originalRevokeObjectURL = URL.revokeObjectURL;

    // @ts-ignore
    URL.createObjectURL = () => 'blob:mock-url';
    // @ts-ignore
    URL.revokeObjectURL = () => {};

    // @ts-ignore
    global.Blob = class Blob {
      content: any[];
      options: any;
      constructor(content: any[], options: any) {
        this.content = content;
        this.options = options;
      }
    };
  });

  after(() => {
    // Restore globals
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    // @ts-ignore
    delete global.Blob;
  });

  it('should format a simple mindmap correctly', () => {
    let capturedMarkdown = '';
    let capturedDownload = '';

    // @ts-ignore
    global.document = {
      createElement: (tag: string) => {
        if (tag === 'a') {
          return {
            download: '',
            href: '',
            click: function() {
              capturedDownload = this.download;
            }
          };
        }
        return {};
      }
    };

    const OriginalBlob = global.Blob;
    // @ts-ignore
    global.Blob = class MockBlob extends OriginalBlob {
      constructor(content: any[], options: any) {
        super(content, options);
        if (options && options.type === 'text/markdown') {
          capturedMarkdown = content[0];
        }
      }
    };

    const nodes = {
      'root': { id: 'root', text: 'Root Node', children: ['child1', 'child2'] },
      'child1': { id: 'child1', text: 'Child 1', children: [] },
      'child2': { id: 'child2', text: 'Child 2', children: ['grandchild1'] },
      'grandchild1': { id: 'grandchild1', text: 'Grandchild 1', children: [] },
    };

    exportToMarkdown(nodes, 'test-export');

    const expectedMarkdown = [
      '# Root Node',
      '',
      '- Child 1',
      '- Child 2',
      '  - Grandchild 1'
    ].join('\n');

    assert.strictEqual(capturedMarkdown, expectedMarkdown);
    assert.strictEqual(capturedDownload, 'test-export.md');

    global.Blob = OriginalBlob;
    // @ts-ignore
    delete global.document;
  });

  it('should handle empty nodes object safely', () => {
    let clicked = false;
    let capturedMarkdown = '';

    // @ts-ignore
    global.document = {
      createElement: (tag: string) => ({
        download: '',
        href: '',
        click: function() { clicked = true; }
      })
    };

    const OriginalBlob = global.Blob;
    // @ts-ignore
    global.Blob = class MockBlob extends OriginalBlob {
      constructor(content: any[], options: any) {
        super(content, options);
        if (options && options.type === 'text/markdown') {
          capturedMarkdown = content[0];
        }
      }
    };

    exportToMarkdown({});

    assert.strictEqual(capturedMarkdown, '');
    assert.strictEqual(clicked, true);

    global.Blob = OriginalBlob;
    // @ts-ignore
    delete global.document;
  });

  it('should handle missing node references gracefully', () => {
    let capturedMarkdown = '';

    // @ts-ignore
    global.document = {
      createElement: (tag: string) => ({
        download: '',
        href: '',
        click: function() {}
      })
    };

    const OriginalBlob = global.Blob;
    // @ts-ignore
    global.Blob = class MockBlob extends OriginalBlob {
      constructor(content: any[], options: any) {
        super(content, options);
        if (options && options.type === 'text/markdown') {
          capturedMarkdown = content[0];
        }
      }
    };

    const nodes = {
      'root': { id: 'root', text: 'Root Node', children: ['missing-child', 'child1'] },
      'child1': { id: 'child1', text: 'Child 1', children: [] },
    };

    exportToMarkdown(nodes);

    const expectedMarkdown = [
      '# Root Node',
      '',
      '- Child 1'
    ].join('\n');

    assert.strictEqual(capturedMarkdown, expectedMarkdown);

    global.Blob = OriginalBlob;
    // @ts-ignore
    delete global.document;
  });
});

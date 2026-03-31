import { test, describe } from 'node:test';
import assert from 'node:assert';
import { applyTemplate, templates } from './templates.ts';

describe('applyTemplate', () => {
  test('should return null for non-existent template ID', () => {
    const result = applyTemplate('non-existent');
    assert.strictEqual(result, null);
  });

  test('should return cloned nodes with new unique IDs', () => {
    const templateId = 'brainstorming';
    const originalTemplate = templates.find(t => t.id === templateId);
    assert.ok(originalTemplate, 'Template should exist');

    const newNodes = applyTemplate(templateId);
    assert.ok(newNodes, 'New nodes should be returned');

    const originalIds = Object.keys(originalTemplate.nodes);
    const newIds = Object.keys(newNodes);

    // (c) ensuring all nodes receive new unique UUIDs
    assert.strictEqual(newIds.length, originalIds.length, 'Node count should match');
    originalIds.forEach(oldId => {
      assert.strictEqual(newIds.includes(oldId), false, `Old ID ${oldId} still exists in new nodes`);
    });

    // (d) validating that all children references are correctly updated to the new IDs
    newIds.forEach(newId => {
      const newNode = newNodes[newId];
      assert.strictEqual(newNode.id, newId, 'Node id property should match its key');

      const originalNode = Object.values(originalTemplate.nodes).find(n => n.text === newNode.text);
      assert.ok(originalNode, `Original node for text "${newNode.text}" should exist`);

      newNode.children.forEach((childId: string) => {
        assert.ok(newIds.includes(childId), `Child ID ${childId} in node ${newId} should be among new IDs`);
        assert.strictEqual(originalIds.includes(childId), false, `Child ID ${childId} should not be an old ID`);
      });
    });
  });

  test('should not modify original templates (deep-cloned)', () => {
    const templateId = 'swot';
    const originalTemplateSnapshot = JSON.parse(JSON.stringify(templates.find(t => t.id === templateId)));

    // (b) confirming nodes are deep-cloned and original templates are not mutated
    applyTemplate(templateId);

    const currentTemplate = templates.find(t => t.id === templateId);
    assert.deepStrictEqual(currentTemplate, originalTemplateSnapshot, 'Original template should remain unchanged');
  });
});

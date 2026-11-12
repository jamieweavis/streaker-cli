import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { visibleWeeks } from './contribution-graph.ts';

describe('visibleWeeks', () => {
  it('shows every week when the width is unknown or wide enough', () => {
    assert.equal(visibleWeeks(53, undefined), 53);
    assert.equal(visibleWeeks(53, 200), 53);
  });

  it('keeps as many two-column weeks as fit beside the day labels', () => {
    assert.equal(visibleWeeks(53, 80), 37);
  });

  it('uses the full width when there is no axis gutter', () => {
    assert.equal(visibleWeeks(53, 80, 0), 40);
  });

  it('always shows at least one week', () => {
    assert.equal(visibleWeeks(53, 4), 1);
  });
});

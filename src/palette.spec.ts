import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { ACCENTS, rainbowIndex } from './palette.ts';

describe('ACCENTS', () => {
  it('includes the ANSI colours, bright variants and rainbow', () => {
    assert.ok(ACCENTS.includes('green'));
    assert.ok(ACCENTS.includes('bright-magenta'));
    assert.ok(ACCENTS.includes('rainbow'));
  });
});

describe('rainbowIndex', () => {
  it('spreads positions evenly across the six colours', () => {
    const icon = Array.from({ length: 12 }, (_, x) => rainbowIndex(x / 12));
    assert.deepEqual(icon, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  });

  it('clamps positions outside 0 to 1', () => {
    assert.equal(rainbowIndex(-1), 0);
    assert.equal(rainbowIndex(1), 5);
  });
});

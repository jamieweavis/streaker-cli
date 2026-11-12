import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  ACCENTS,
  blend,
  rainbowIndex,
  TILE_OPACITY,
  toAnsi256,
} from './palette.ts';

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

describe('blend', () => {
  it('returns the background at 0 and the foreground at 1', () => {
    assert.deepEqual(blend([200, 100, 50], [0, 0, 0], 0), [0, 0, 0]);
    assert.deepEqual(blend([200, 100, 50], [0, 0, 0], 1), [200, 100, 50]);
  });

  it('mixes linearly in between', () => {
    assert.deepEqual(blend([200, 100, 50], [0, 0, 0], 0.5), [100, 50, 25]);
  });
});

describe('TILE_OPACITY', () => {
  it('has one increasing opacity per contribution level', () => {
    assert.equal(TILE_OPACITY.length, 5);
    assert.deepEqual([...TILE_OPACITY].sort(), TILE_OPACITY);
  });
});

describe('toAnsi256', () => {
  it('maps primaries onto the colour cube', () => {
    assert.equal(toAnsi256([255, 0, 0]), 196);
    assert.equal(toAnsi256([0, 255, 0]), 46);
  });

  it('maps greys onto the greyscale ramp', () => {
    assert.equal(toAnsi256([0, 0, 0]), 16);
    assert.equal(toAnsi256([255, 255, 255]), 231);
    assert.equal(toAnsi256([128, 128, 128]), 244);
  });
});

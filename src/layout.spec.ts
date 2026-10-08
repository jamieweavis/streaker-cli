import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  indent,
  joinColumns,
  stackColumns,
  totalWidth,
  visibleWidth,
} from './layout.ts';

const red = (text: string) => `\x1b[31m${text}\x1b[39m`;

describe('visibleWidth', () => {
  it('ignores ANSI escape codes', () => {
    assert.equal(visibleWidth(red('streak')), 6);
  });
});

describe('totalWidth', () => {
  it('sums the widest line of each column plus gaps', () => {
    assert.equal(totalWidth([['ab', 'abcd'], ['x']], 2), 4 + 2 + 1);
  });

  it('is 0 for no columns', () => {
    assert.equal(totalWidth([]), 0);
  });
});

describe('joinColumns', () => {
  it('pads each column to its widest line', () => {
    assert.equal(
      joinColumns(
        [
          ['a', 'abc'],
          ['x', 'y'],
        ],
        1,
      ),
      'a   x\nabc y',
    );
  });

  it('pads by visible width when lines are coloured', () => {
    assert.equal(
      joinColumns(
        [
          [red('a'), 'abc'],
          ['x', 'y'],
        ],
        1,
      ),
      `${red('a')}   x\nabc y`,
    );
  });

  it('fills missing rows in shorter columns', () => {
    assert.equal(joinColumns([['a', 'b', 'c'], ['x']], 1), 'a x\nb\nc');
  });
});

describe('stackColumns', () => {
  it('separates columns with a blank line', () => {
    assert.equal(stackColumns([['a', 'b'], ['x']]), 'a\nb\n\nx');
  });
});

describe('indent', () => {
  it('indents non-empty lines only', () => {
    assert.equal(indent('a\n\nb', 2), '  a\n\n  b');
  });
});

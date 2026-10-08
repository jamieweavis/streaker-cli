import { stripVTControlCharacters } from 'node:util';

export const GAP = 4;

export const visibleWidth = (text: string): number =>
  stripVTControlCharacters(text).length;

const columnWidth = (column: string[]): number =>
  Math.max(0, ...column.map(visibleWidth));

export const totalWidth = (columns: string[][], gap = GAP): number =>
  columns.reduce((width, column) => width + columnWidth(column), 0) +
  gap * Math.max(0, columns.length - 1);

export const joinColumns = (columns: string[][], gap = GAP): string => {
  const height = Math.max(0, ...columns.map((column) => column.length));
  const widths = columns.map(columnWidth);
  const lines: string[] = [];

  for (let row = 0; row < height; row++) {
    const cells = columns.map((column, index) => {
      const cell = column[row] ?? '';
      return cell + ' '.repeat(widths[index] - visibleWidth(cell));
    });
    lines.push(cells.join(' '.repeat(gap)).trimEnd());
  }

  return lines.join('\n');
};

export const stackColumns = (columns: string[][]): string =>
  columns.map((column) => column.join('\n')).join('\n\n');

export const indent = (text: string, spaces = 2): string =>
  text
    .split('\n')
    .map((line) => (line ? ' '.repeat(spaces) + line : line))
    .join('\n');

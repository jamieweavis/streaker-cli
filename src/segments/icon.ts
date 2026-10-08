import type { Palette } from '../palette.ts';

// biome-ignore format: keep the icon readable as art
const ICON = [
  ' ██▄▄▄▄▄▄██',
  '███▀▀▀▀▀▀███',
  '██  █  █  ██',
  ' ▀▀▄▄▄▄▄▄▀▀',
];

const WIDTH = Math.max(...ICON.map((line) => line.length));

export const renderIcon = (palette: Palette): string[] =>
  ICON.map((line) =>
    [...line]
      .map((char, x) =>
        char === ' ' ? char : palette.accentAt(char, x / WIDTH),
      )
      .join(''),
  );

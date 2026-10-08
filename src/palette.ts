import {
  blue,
  blueBright,
  bold,
  cyan,
  cyanBright,
  dim,
  green,
  greenBright,
  magenta,
  magentaBright,
  red,
  redBright,
  white,
  whiteBright,
  yellow,
  yellowBright,
} from 'colorette';

type Colour = (text: string) => string;

export type Palette = {
  /** Headings */
  accent: Colour;
  /** Icon and graph cells, `position` runs from 0 (left) to 1 (right) */
  accentAt: (text: string, position: number) => string;
  label: Colour;
  value: Colour;
};

const solidAccents: Record<string, Colour> = {
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  'bright-red': redBright,
  'bright-green': greenBright,
  'bright-yellow': yellowBright,
  'bright-blue': blueBright,
  'bright-magenta': magentaBright,
  'bright-cyan': cyanBright,
  'bright-white': whiteBright,
};

const rainbow: Colour[] = [red, yellow, green, cyan, blue, magenta];

export const ACCENTS = [...Object.keys(solidAccents), 'rainbow'];

export const rainbowIndex = (position: number): number =>
  Math.min(
    rainbow.length - 1,
    Math.max(0, Math.floor(position * rainbow.length)),
  );

export const createPalette = (accent: string): Palette => {
  if (accent === 'rainbow') {
    return {
      accent: (text) => bold(magenta(text)),
      accentAt: (text, position) => rainbow[rainbowIndex(position)](text),
      label: dim,
      value: (text) => bold(cyan(text)),
    };
  }

  const colour = solidAccents[accent] ?? green;
  return {
    accent: (text) => bold(colour(text)),
    accentAt: (text) => colour(text),
    label: dim,
    value: bold,
  };
};

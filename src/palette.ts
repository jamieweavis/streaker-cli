import {
  blue,
  blueBright,
  bold,
  cyan,
  cyanBright,
  dim,
  green,
  greenBright,
  isColorSupported,
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
  /** A graph tile for contribution `level` (0-4), `position` as above */
  tile: (level: number, position: number) => string;
};

type Rgb = [number, number, number];

/** Approximate RGB for each accent, used when the terminal supports more than 16 colours */
const accentRgb: Record<string, Rgb> = {
  red: [229, 72, 77],
  green: [57, 211, 83],
  yellow: [234, 196, 53],
  blue: [64, 140, 255],
  magenta: [236, 112, 170],
  cyan: [45, 200, 210],
  white: [220, 220, 220],
  'bright-red': [255, 110, 110],
  'bright-green': [110, 240, 130],
  'bright-yellow': [255, 225, 100],
  'bright-blue': [110, 175, 255],
  'bright-magenta': [255, 145, 200],
  'bright-cyan': [100, 235, 240],
  'bright-white': [255, 255, 255],
};

const rainbowRgb: Rgb[] = [
  accentRgb.red,
  accentRgb.yellow,
  accentRgb.green,
  accentRgb.cyan,
  accentRgb.blue,
  accentRgb.magenta,
];

const TILE = '■';
export const TILE_WIDTH = TILE.length;
/** Assumed dark terminal background that tiles fade into */
const BACKGROUND: Rgb = [24, 24, 24];
/** Opacity of the accent for each contribution level, level 0 is left blank */
export const TILE_OPACITY = [0, 0.35, 0.55, 0.78, 1];
const PLAIN_TILES = [' ', '░', '▒', '▓', '█'].map((char) =>
  char.repeat(TILE_WIDTH),
);

export const blend = (fg: Rgb, bg: Rgb, alpha: number): Rgb =>
  fg.map((c, i) => Math.round(bg[i] + (c - bg[i]) * alpha)) as Rgb;

export const toAnsi256 = ([r, g, b]: Rgb): number => {
  const grey = r === g && g === b;
  if (grey) {
    if (r < 8) return 16;
    if (r > 248) return 231;
    return Math.round(((r - 8) / 247) * 24) + 232;
  }
  const step = (c: number) => Math.round((c / 255) * 5);
  return 16 + 36 * step(r) + 6 * step(g) + step(b);
};

const colourDepth = (): number => {
  if (!isColorSupported) return 1;
  return process.stdout.getColorDepth?.() ?? 4;
};

const createTile = (
  rgbAt: (position: number) => Rgb,
  colourAt: (position: number) => Colour,
): Palette['tile'] => {
  const tile = createFilledTile(rgbAt, colourAt);
  return (level, position) =>
    level === 0 ? ' '.repeat(TILE_WIDTH) : tile(level, position);
};

const createFilledTile = (
  rgbAt: (position: number) => Rgb,
  colourAt: (position: number) => Colour,
): Palette['tile'] => {
  const depth = colourDepth();

  if (depth >= 24) {
    return (level, position) => {
      const [r, g, b] = blend(rgbAt(position), BACKGROUND, TILE_OPACITY[level]);
      return `\x1b[38;2;${r};${g};${b}m${TILE}\x1b[39m`;
    };
  }

  if (depth >= 8) {
    return (level, position) => {
      const code = toAnsi256(
        blend(rgbAt(position), BACKGROUND, TILE_OPACITY[level]),
      );
      return `\x1b[38;5;${code}m${TILE}\x1b[39m`;
    };
  }

  if (depth >= 4) {
    return (level, position) => {
      const colour = colourAt(position);
      return level <= 2 ? dim(colour(TILE)) : colour(TILE);
    };
  }

  return (level) => PLAIN_TILES[level];
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
      tile: createTile(
        (position) => rainbowRgb[rainbowIndex(position)],
        (position) => rainbow[rainbowIndex(position)],
      ),
    };
  }

  const known = accent in solidAccents;
  const colour = known ? solidAccents[accent] : green;
  const rgb = known ? accentRgb[accent] : accentRgb.green;
  return {
    accent: (text) => bold(colour(text)),
    accentAt: (text) => colour(text),
    label: dim,
    value: bold,
    tile: createTile(
      () => rgb,
      () => colour,
    ),
  };
};

import type { Palette } from '../palette.ts';

const LABEL_GAP = 4;

export const renderStats = (
  heading: string,
  rows: [label: string, value: number][],
  palette: Palette,
): string[] => {
  const labelWidth = Math.max(...rows.map(([label]) => label.length));
  const valueWidth = Math.max(...rows.map(([, value]) => String(value).length));

  return [
    palette.accent(heading),
    ...rows.map(
      ([label, value]) =>
        palette.label(label.padEnd(labelWidth)) +
        ' '.repeat(LABEL_GAP) +
        palette.value(String(value).padStart(valueWidth)),
    ),
  ];
};

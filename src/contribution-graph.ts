import type { Contributions } from 'contribution';

import { type Palette, TILE_WIDTH } from './palette.ts';

/** Columns used by each week: a tile and a gap */
const CELL_WIDTH = TILE_WIDTH + 1;
/** Columns used by the day labels and border, e.g. `Mon │ ` */
const GUTTER_WIDTH = 6;

/** How many weeks fit in `columns`, or all of them when the width is unknown */
export const visibleWeeks = (
  total: number,
  columns?: number,
  gutter = GUTTER_WIDTH,
): number =>
  columns
    ? Math.max(1, Math.min(total, Math.floor((columns - gutter) / CELL_WIDTH)))
    : total;

export type GraphOptions = {
  /** Show the month and day labels and the border, defaults to true */
  axis?: boolean;
  /** Terminal width to fit the graph in, defaults to the current terminal */
  columns?: number;
};

export function buildContributionGraph(
  contributions: Contributions,
  palette: Palette,
  { axis = true, columns = process.stdout.columns }: GraphOptions = {},
): string {
  // Sort dates to ensure chronological order
  const sortedDates = Object.keys(contributions).sort();
  if (sortedDates.length === 0) return 'No data available';

  // Group dates by week
  let weeks: string[][] = [];
  let currentWeek: string[] = [];

  for (const dateStr of sortedDates) {
    const currentDate = new Date(dateStr);

    // Start new week if it's a Sunday
    if (currentDate.getDay() === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push(dateStr);
  }

  // Add the last week if it's not empty
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Keep the most recent weeks that fit in the terminal
  weeks = weeks.slice(
    weeks.length - visibleWeeks(weeks.length, columns, axis ? GUTTER_WIDTH : 0),
  );

  // Initialize the graph with proper dimensions
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let graph = '';

  // Add month labels at top of graph
  const months: string[] = [];
  const monthPositions: number[] = [];

  weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = new Date(week[0]);
    const month = firstDayOfWeek.toLocaleString('default', { month: 'short' });

    if (months.length === 0 || months[months.length - 1] !== month) {
      months.push(month);
      monthPositions.push(weekIndex);
    }
  });

  // Add month labels
  let monthLabels = '';
  monthPositions.forEach((pos, idx) => {
    const month = months[idx];
    const nextPos =
      idx < monthPositions.length - 1 ? monthPositions[idx + 1] : weeks.length;
    const width = (nextPos - pos) * CELL_WIDTH;
    // Skip a label that would collide with the next one
    if (width < month.length + 1 && idx < monthPositions.length - 1) {
      monthLabels += ' '.repeat(width);
      return;
    }
    monthLabels += month.padEnd(width);
  });
  if (axis) {
    graph += `      ${palette.label(monthLabels.trimEnd())}\n`;
    graph += `    ${palette.label(`┌${'─'.repeat(weeks.length * CELL_WIDTH)}`)}\n`;
  }

  // Build the graph row by row (day by day)
  for (let day = 0; day < 7; day++) {
    let row = axis ? `${palette.label(`${dayLabels[day]} │`)} ` : '';

    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex];
      let cell = ' '.repeat(CELL_WIDTH);

      // Find the day in this week
      for (const dateStr of week) {
        const date = new Date(dateStr);
        if (date.getDay() === day) {
          const level = contributions[dateStr].gitHubLegendLevel;
          cell = `${palette.tile(level, weekIndex / weeks.length)} `;
          break;
        }
      }

      row += cell;
    }

    graph += `${row.trimEnd()}\n`;
  }

  if (axis) {
    graph += `    ${palette.label(`└${'─'.repeat(weeks.length * CELL_WIDTH)}`)}`;
  }

  return graph.trimEnd();
}

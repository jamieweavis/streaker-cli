import type { Contributions } from 'contribution';

import type { Palette } from './palette.ts';

export function buildContributionGraph(
  contributions: Contributions,
  palette: Palette,
): string {
  // Define ASCII characters for different contribution levels
  const levels = [' ', '░', '▒', '▓', '█'];

  // Sort dates to ensure chronological order
  const sortedDates = Object.keys(contributions).sort();
  if (sortedDates.length === 0) return 'No data available';

  // Group dates by week
  const weeks: string[][] = [];
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
    // Adjust spacing to account for no spaces between week columns
    const width = nextPos - pos;
    const spaces = Math.max(0, width - month.length);

    monthLabels += month + ' '.repeat(spaces);
  });
  graph += `     ${palette.label(monthLabels)}\n`;

  // Add a separator line
  graph += `    ${palette.label(`┌${'─'.repeat(weeks.length)}─`)}\n`;

  // Build the graph row by row (day by day)
  for (let day = 0; day < 7; day++) {
    graph += `${palette.label(`${dayLabels[day]} │`)} `;

    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex];
      let cell = ' ';

      // Find the day in this week
      for (const dateStr of week) {
        const date = new Date(dateStr);
        if (date.getDay() === day) {
          const level = contributions[dateStr].gitHubLegendLevel;
          cell =
            level === 0
              ? ' '
              : palette.accentAt(levels[level], weekIndex / weeks.length);
          break;
        }
      }

      graph += cell; // No space added after each cell
    }

    graph += '\n';
  }

  // Add a bottom line
  graph += `    ${palette.label(`└${'─'.repeat(weeks.length)}─`)}`;

  return graph;
}

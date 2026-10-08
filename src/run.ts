import { red } from 'colorette';
import { fetchGitHubStats } from 'contribution';

import { buildContributionGraph } from './contribution-graph.ts';
import { indent, joinColumns, stackColumns, totalWidth } from './layout.ts';
import { createPalette } from './palette.ts';
import { renderIcon } from './segments/icon.ts';
import { renderStats } from './segments/stats.ts';

export type RunOptions = {
  accent: string;
  contributions: boolean;
  graph?: boolean;
  icon: boolean;
  streak: boolean;
};

const INDENT = 2;

const fail = (message: string) => {
  console.error(`\n  ${red(message)}\n`);
  return process.exit(1);
};

export const run = async (
  username: string | undefined,
  options: RunOptions,
) => {
  try {
    if (!username) {
      return fail('Please provide a valid GitHub username');
    }

    if (
      !options.graph &&
      !options.icon &&
      !options.streak &&
      !options.contributions
    ) {
      return fail('Enable at least one of icon, streak or contributions');
    }

    const gitHubStats = await fetchGitHubStats(username);
    const palette = createPalette(options.accent);

    if (options.graph) {
      console.info(
        `\n${buildContributionGraph(gitHubStats.contributions, palette)}\n`,
      );
      return process.exit(0);
    }

    const statColumns: string[][] = [];
    if (options.streak) {
      statColumns.push(
        renderStats(
          'streak',
          [
            ['current', gitHubStats.currentStreak],
            ['best', gitHubStats.bestStreak],
            ['previous', gitHubStats.previousStreak],
          ],
          palette,
        ),
      );
    }
    if (options.contributions) {
      statColumns.push(
        renderStats(
          'contributions',
          [
            ['today', gitHubStats.todaysContributions],
            ['most', gitHubStats.mostContributions],
            ['total', gitHubStats.totalContributions],
          ],
          palette,
        ),
      );
    }

    const columns = options.icon
      ? [renderIcon(palette), ...statColumns]
      : statColumns;

    // Drop the icon first, then stack the stats, when the terminal is too narrow
    const available = (process.stdout.columns ?? Infinity) - INDENT;
    let output: string;
    if (totalWidth(columns) <= available) {
      output = joinColumns(columns);
    } else if (statColumns.length > 0 && totalWidth(statColumns) <= available) {
      output = joinColumns(statColumns);
    } else {
      output = stackColumns(statColumns.length > 0 ? statColumns : columns);
    }

    console.info(`\n${indent(output, INDENT)}\n`);
    return process.exit(0);
  } catch (_error) {
    return fail('Failed to fetch contribution stats');
  }
};

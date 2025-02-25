#!/usr/bin/env node

import { blue, cyan, red, yellow } from 'colorette';
import { fetchStats } from 'contribution';

(async () => {
  const username = process.argv[2]?.trim();
  try {
    if (!username) {
      console.error(
        `
  ${red('Please provide a GitHub username')}

  streaker ${cyan('<username>')}
`,
      );
      process.exit(1);
    }

    const { streak, contributions } = await fetchStats(username);

    console.info(
      `
  ${blue('Streak')}
    Best     ${yellow(streak.best)}
    Current  ${yellow(streak.current)}
    Previous ${yellow(streak.previous)}
    `,
    );

    console.info(
      `  ${blue('Contributions')}
    Best  ${yellow(contributions.best)}
    Today ${yellow(contributions.current)}
    Total ${yellow(contributions.total)}
      `,
    );

    process.exit(0);
  } catch (error) {
    console.error(`
  ${red('Failed to fetch contribution statistics for user')} ${cyan(username)}
`);
    process.exit(1);
  }
})();

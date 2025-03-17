import { blue, red, yellow } from 'colorette';
import { fetchStats } from 'contribution';

export const run = async (username?: string) => {
  try {
    if (!username) {
      console.error(
        `
  ${red('Please provide a valid GitHub username')}
`,
      );
      return process.exit(1);
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
    Most  ${yellow(contributions.best)}
    Today ${yellow(contributions.current)}
    Total ${yellow(contributions.total)}`,
    );

    return process.exit(0);
  } catch (error) {
    console.error(`\n${red('Failed to fetch contribution stats')}`);
    return process.exit(1);
  }
};

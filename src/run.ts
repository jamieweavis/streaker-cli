import { blue, red, yellow } from 'colorette';
import { fetchGitHubStats } from 'contribution';

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

    const gitHubStats = await fetchGitHubStats(username);

    console.info(
      `
  ${blue('Streak')}
    Best     ${yellow(gitHubStats.bestStreak)}
    Current  ${yellow(gitHubStats.currentStreak)}
    Previous ${yellow(gitHubStats.previousStreak)}
`,
    );

    console.info(
      `  ${blue('Contributions')}
    Most  ${yellow(gitHubStats.mostContributions)}
    Today ${yellow(gitHubStats.todaysContributions)}
    Total ${yellow(gitHubStats.totalContributions)}`,
    );

    return process.exit(0);
  } catch (error) {
    console.error(`\n${red('Failed to fetch contribution stats')}`);
    return process.exit(1);
  }
};

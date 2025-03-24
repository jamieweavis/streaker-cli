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

    const gitHubStatus = await fetchGitHubStats(username);

    console.info(
      `
  ${blue('Streak')}
    Best     ${yellow(gitHubStatus.bestStreak)}
    Current  ${yellow(gitHubStatus.currentStreak)}
    Previous ${yellow(gitHubStatus.previousStreak)}
`,
    );

    console.info(
      `  ${blue('Contributions')}
    Most  ${yellow(gitHubStatus.mostContributions)}
    Today ${yellow(gitHubStatus.todaysContributions)}
    Total ${yellow(gitHubStatus.totalContributions)}`,
    );

    return process.exit(0);
  } catch (error) {
    console.error(`\n${red('Failed to fetch contribution stats')}`);
    return process.exit(1);
  }
};

#!/usr/bin/env node

const { blue, red, bold, underline } = require('colorette');
const contribution = require('contribution');
const githubUsernameRegex = require('github-username-regex');

const { log } = console;
const username = process.argv[2] || '';

if (!githubUsernameRegex.test(username)) {
  const error = !username
    ? 'GitHub username is required.'
    : 'Invalid GitHub username.';
  log(`
${red(error)}

  Usage: streaker <username>

  Displays contribution statistics for provided username
  `);
  process.exit();
}

contribution(username).then(data => {
  log(`
${blue('Streak:')}
  Best: ${data.streak.best}
  Current: ${data.streak.current}

${blue('Contributions:')}
  Best: ${data.contributions.best}
  Current: ${data.contributions.current}
  Total: ${data.contributions.total}
  d`);
});

#!/usr/bin/env node
const ora = require('ora');
const chalk = require('chalk');
const streaker = require('caporal');
const contribution = require('contribution');
const pjson = require('../package.json');

streaker
  .version(pjson.version)
  .description(pjson.description)
  .argument('<username>', 'GitHub username')
  .action(args => {
    const username = chalk.blue(args.username);
    const spinner = ora(`Fetching streak for ${username}`).start();
    spinner.color = 'yellow';
    contribution(args.username).then(data => {
      spinner.succeed(
        `Fetched streak for ${username}: ${chalk.yellow(data.streak)}`
      );
    });
  });
streaker.parse(process.argv);

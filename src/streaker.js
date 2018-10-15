#!/usr/bin/env node

const contribution = require('contribution');
const streaker = require('caporal');
const pjson = require('../package.json');
const log = require('./log');

streaker
  .version(pjson.version)
  .description(pjson.description)
  .argument('<username>', 'GitHub Username')
  .action(async args => {
    const data = await contribution(args.username);
    log.currentStreak(data.currentStreak);
    log.bestStreak(data.bestStreak);
    log.contributions(data.contributions);
  });

streaker.parse(process.argv);

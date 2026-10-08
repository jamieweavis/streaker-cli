#!/usr/bin/env node

import { Option, program } from 'commander';

import pkg from '../package.json' with { type: 'json' };
import { ACCENTS } from './palette.ts';
import { run } from './run.ts';

const init = () => {
  const result = program
    .description(pkg.description)
    .version(pkg.version)
    .arguments('<username>')
    .addOption(
      new Option(
        '-a, --accent <color>',
        'accent color for the icon, headings and graph',
      )
        .choices(ACCENTS)
        .default('green'),
    )
    .option(
      '-g, --graph',
      'output ASCII GitHub contribution graph instead of stats',
    )
    .option('--no-icon', 'hide the octocat icon')
    .option('--no-streak', 'hide streak stats')
    .option('--no-contributions', 'hide contribution stats')
    .parse();

  const username = result.args[0]?.trim();
  const options = result.opts();

  return run(username, {
    accent: options.accent,
    contributions: options.contributions,
    graph: options.graph,
    icon: options.icon,
    streak: options.streak,
  });
};

init();

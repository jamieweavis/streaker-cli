#!/usr/bin/env node

import { program } from 'commander';

import { description, version } from '../package.json';
import { run } from './run';

const init = () => {
  const result = program
    .description(description)
    .version(version)
    .arguments('<username>')
    .option(
      '-g, --graph',
      'output ASCII GitHub contribution graph instead of stats',
    )
    .parse();

  const username = result.args[0]?.trim();
  const options = result.opts();

  return run(username, options.graph);
};

init();

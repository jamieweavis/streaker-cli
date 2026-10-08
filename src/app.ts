#!/usr/bin/env node

import { program } from 'commander';

import pkg from '../package.json' with { type: 'json' };
import { run } from './run.ts';

const init = () => {
  const result = program
    .description(pkg.description)
    .version(pkg.version)
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

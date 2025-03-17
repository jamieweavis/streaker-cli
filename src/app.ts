#!/usr/bin/env node

import { program } from 'commander';

import { description, version } from '../package.json';
import { run } from './run';

const init = () => {
  const result = program
    .description(description)
    .version(version)
    .arguments('<username>')
    .parse();

  const username = result.args[0]?.trim();
  return run(username);
};

init();

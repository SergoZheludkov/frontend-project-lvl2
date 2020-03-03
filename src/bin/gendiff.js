#!/usr/bin/env node
import program from 'commander';
import showMeTheDifferences from '..';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(showMeTheDifferences(firstConfig, secondConfig));
  });

program.parse(process.argv);

export default (firstFile, secondFile) => showMeTheDifferences(firstFile, secondFile);

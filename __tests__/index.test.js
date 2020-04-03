import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

describe('All test', () => {
  const fileFormats = [
    ['before.json', 'after.json', 'tree', 'resultTree.txt'],
    ['before.yml', 'after.yml', 'plain', 'resultPlain.txt'],
    ['before.ini', 'after.ini', 'json', 'resultJson.txt'],
  ];
  test.each(fileFormats)('Performance test', (before, after, format, resultFileName) => {
    const resultFileData = readFile(resultFileName);
    const beforeFileData = getFixturePath(before);
    const afterFileData = getFixturePath(after);
    expect(genDiff(beforeFileData, afterFileData, format)).toEqual(resultFileData);
  });
});

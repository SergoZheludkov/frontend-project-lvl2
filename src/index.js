import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import getMeParser from './parser';

const getMeDataFile = (link) => {
  const normalLink = path.resolve(process.cwd(), link);
  const format = path.extname(link);
  const parser = getMeParser(format);
  const jsonData = parser(fs.readFileSync(normalLink, 'utf8'));
  const keys = Object.keys(jsonData);
  return [keys, jsonData];
};

const showMeTheDifferences = (link1, link2) => {
  const [firstDataKeys, firstFileData] = getMeDataFile(link1);
  const [secondDataKeys, secondFileData] = getMeDataFile(link2);
  const unionKeys = lodash.union(firstDataKeys, secondDataKeys);
  const sortedKeys = lodash.sortedUniq(unionKeys);

  const resultArray = sortedKeys.reduce((acc, key) => {
    if (secondFileData[key] === firstFileData[key]) {
      acc.push(`  ${key}: ${secondFileData[key]}`);
    } else if (secondFileData[key] !== firstFileData[key]) {
      if (lodash.has(secondFileData, key)) {
        acc.push(`+ ${key}: ${secondFileData[key]}`);
      }
      if (lodash.has(firstFileData, key)) {
        acc.push(`- ${key}: ${firstFileData[key]}`);
      }
    }
    return acc;
  }, []);

  const stringResult = `{\n${resultArray.join('\n')}\n}`;
  return stringResult;
};

export default showMeTheDifferences;

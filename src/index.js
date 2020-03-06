import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import getParser from './parser';

const getDataFile = (link) => {
  const normalLink = path.resolve(process.cwd(), link); // получение полной ссылки
  const format = path.extname(link); // извлечение формата файла (.json / .yml / .ini)
  const parser = getParser(format); // выбор парсера
  const fileData = parser(fs.readFileSync(normalLink, 'utf8'));
  return fileData; // вернуть объект с данными из файла
};

const getDiff = (fileData1, fileData2) => {
  const firstKeys = Object.keys(fileData1);
  const secondData = Object.keys(fileData2);
  const unionKeys = lodash.union(firstKeys, secondData);
  const sortedKeys = lodash.sortedUniq(unionKeys);

  return sortedKeys.reduce((acc, key) => {
    const value1 = fileData1[key];
    const value2 = fileData2[key];

    if (lodash.has(fileData1, key) && lodash.has(fileData2, key)) {
      if (value2 === value1) {
        acc.push([' ', key, value2]);
      } else if (value2 !== value1 && lodash.isObject(value2) && lodash.isObject(value1)) {
        acc.push([' ', key, getDiff(value1, value2)]);
      } else if (value2 !== value1) {
        acc.push(['+', key, value2]);
        acc.push(['-', key, value1]);
      }
    } else if (lodash.has(fileData2, key) && !lodash.has(fileData1, key)) {
      acc.push(['+', key, value2]);
    } else if (lodash.has(fileData1, key) && !lodash.has(fileData2, key)) {
      acc.push(['-', key, value1]);
    }

    return acc;
  }, []);
};

const doRender = (dataArray) => {
  const resultArray = dataArray.reduce((acc, item) => {
    const [symbol, key, value] = item;
    if (Array.isArray(value)) {
      acc.push(`  ${symbol} ${key}: ${doRender(value)}`);
    } else {
      acc.push(`  ${symbol} ${key}: ${value}`);
    }
    return acc;
  }, []);

  return `{\n${resultArray.join('\n')}\n}`;
};

const showTheDifferences = (link1, link2) => {
  const firstFileData = getDataFile(link1);
  const secondFileData = getDataFile(link2);
  const resultDiff = getDiff(firstFileData, secondFileData);
  const render = doRender(resultDiff);
  return render;
};

export default showTheDifferences;

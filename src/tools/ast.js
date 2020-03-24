import lodash from 'lodash';

const getAllKeys = (file1, file2) => {
  const firstKeys = Object.keys(file1);
  const secondKeys = Object.keys(file2);
  const unionKeys = lodash.union(firstKeys, secondKeys);
  const sortedKeys = lodash.sortedUniq(unionKeys);
  return sortedKeys;
};

const doSortName = (a, b) => {
  if (a.key < b.key) {
    return -1;
  }
  if (a.key > b.key) {
    return 1;
  }
  return 0;
};

const getAst = (fileData1, fileData2) => {
  const keys = getAllKeys(fileData1, fileData2);
  const ast = keys.reduce((acc, item) => {
    const value1 = fileData1[item];
    const value2 = fileData2[item];
    if (lodash.has(fileData1, item) && lodash.has(fileData2, item)) {
      if (value2 === value1) {
        acc.push({ type: ' ', key: item, value: value2 });
      } else if (value2 !== value1 && lodash.isObject(value2) && lodash.isObject(value1)) {
        acc.push({ type: ' ', key: item, children: getAst(value1, value2) });
      } else if (value2 !== value1) {
        acc.push({ type: '+', key: item, value: value2 });
        acc.push({ type: '-', key: item, value: value1 });
      }
    } else if (lodash.has(fileData2, item) && !lodash.has(fileData1, item)) {
      acc.push({ type: '+', key: item, value: value2 });
    } else if (lodash.has(fileData1, item) && !lodash.has(fileData2, item)) {
      acc.push({ type: '-', key: item, value: value1 });
    }

    return acc.sort(doSortName);
  }, []);
  return ast;
};

export default getAst;

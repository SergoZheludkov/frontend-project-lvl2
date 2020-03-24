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
    const oldValue = fileData1[item];
    const newValue = fileData2[item];
    const key = item;

    if (lodash.has(fileData1, key) && lodash.has(fileData2, key)) {
      if (newValue === oldValue) {
        acc.push({
          type: 'unchanged',
          key,
          newValue,
        });
      } else if (newValue !== oldValue && lodash.isObject(newValue) && lodash.isObject(oldValue)) {
        acc.push({
          type: 'unchanged',
          key,
          children: getAst(oldValue, newValue),
        });
      } else if (newValue !== oldValue) {
        acc.push({
          type: 'changed',
          key,
          newValue,
          oldValue,
        });
      }
    } else if (lodash.has(fileData2, key) && !lodash.has(fileData1, key)) {
      acc.push({
        type: 'added',
        key,
        newValue,
      });
    } else if (lodash.has(fileData1, key) && !lodash.has(fileData2, key)) {
      acc.push({
        type: 'deleted',
        key,
        oldValue,
      });
    }
    return acc;
  }, []);

  return ast.sort(doSortName);
};

export default getAst;

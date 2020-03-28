import lodash from 'lodash';

const getAllKeys = (fileData1, fileData2) => {
  const firstKeys = Object.keys(fileData1);
  const secondKeys = Object.keys(fileData2);
  const unionKeys = lodash.union(firstKeys, secondKeys);
  const sortedKeys = lodash.sortedUniq(unionKeys);
  return sortedKeys;
};

const getAst = (fileData1, fileData2) => {
  const keys = getAllKeys(fileData1, fileData2).sort();
  const ast = keys.map((item) => {
    const oldValue = fileData1[item];
    const newValue = fileData2[item];
    const key = item;

    if (lodash.has(fileData1, key) && lodash.has(fileData2, key)) {
      if (newValue === oldValue) {
        return {
          type: 'unchanged',
          key,
          newValue,
        };
      } if (newValue !== oldValue && lodash.isObject(newValue) && lodash.isObject(oldValue)) {
        return {
          type: 'unchanged',
          key,
          children: getAst(oldValue, newValue),
        };
      } if (newValue !== oldValue) {
        return {
          type: 'changed',
          key,
          newValue,
          oldValue,
        };
      }
    } else if (lodash.has(fileData2, key) && !lodash.has(fileData1, key)) {
      return {
        type: 'added',
        key,
        newValue,
      };
    } else if (lodash.has(fileData1, key) && !lodash.has(fileData2, key)) {
      return {
        type: 'deleted',
        key,
        oldValue,
      };
    }
    return item;
  });
  return ast;
};

export default getAst;

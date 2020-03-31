import _ from 'lodash';

const getAllKeys = (beforeData, afterData) => {
  const firstKeys = Object.keys(beforeData);
  const secondKeys = Object.keys(afterData);
  const unionKeys = _.union(firstKeys, secondKeys);
  return unionKeys.sort();
};

const getAst = (beforeData, afterData) => {
  const keys = getAllKeys(beforeData, afterData);
  const ast = keys.map((item) => {
    const oldValue = beforeData[item];
    const newValue = afterData[item];
    const key = item;

    if (_.has(afterData, key) && !_.has(beforeData, key)) {
      return {
        type: 'added',
        key,
        newValue,
      };
    }
    if (_.has(beforeData, key) && !_.has(afterData, key)) {
      return {
        type: 'deleted',
        key,
        oldValue,
      };
    }
    if (newValue === oldValue) {
      return {
        type: 'unchanged',
        key,
        newValue,
      };
    }
    if (newValue !== oldValue && _.isObject(newValue) && _.isObject(oldValue)) {
      return {
        type: 'depth',
        key,
        children: getAst(oldValue, newValue),
      };
    }
    if (newValue !== oldValue) {
      return {
        type: 'changed',
        key,
        newValue,
        oldValue,
      };
    }
    return item;
  });
  return ast;
};

export default getAst;

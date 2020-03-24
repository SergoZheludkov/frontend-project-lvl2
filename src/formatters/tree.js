import lodash from 'lodash';

const indent = (repetitions) => '  '.repeat(repetitions);
const indentFromBraces = (indentation) => indentation.slice(0, indentation.length - 2);

const stringify = (val, deep) => {
  if (lodash.isObject(val)) {
    const res = Object.entries(val).flat();
    const [key, value] = res;
    return `{\n${indent(deep)}  ${key}: ${value}\n${indentFromBraces(indent(deep))}}`;
  }
  return val;
};

const getRenderTree = (dataArray, deep = 1) => {
  const result = dataArray.reduce((acc, item) => {
    const {
      type,
      key,
      newValue,
      oldValue,
      children,
    } = item;

    if (Array.isArray(children)) {
      acc.push(`${indent(deep)}  ${key}: ${getRenderTree(children, deep + 2)}`);
    } else if (type === 'unchanged') {
      acc.push(`${indent(deep)}  ${key}: ${stringify(newValue, deep + 2)}`);
    } else if (type === 'added') {
      acc.push(`${indent(deep)}+ ${key}: ${stringify(newValue, deep + 2)}`);
    } else if (type === 'deleted') {
      acc.push(`${indent(deep)}- ${key}: ${stringify(oldValue, deep + 2)}`);
    } else if (type === 'changed') {
      acc.push(`${indent(deep)}+ ${key}: ${stringify(newValue, deep + 2)}`);
      acc.push(`${indent(deep)}- ${key}: ${stringify(oldValue, deep + 2)}`);
    }

    return acc;
  }, []);
  const string = `{\n${result.join('\n')}\n${indentFromBraces(indent(deep))}}`;
  return string;
};

export default getRenderTree;

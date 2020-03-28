import lodash from 'lodash';

const indent = (repetitions) => '  '.repeat(repetitions);
const indentFromBraces = (indentation) => indentation.slice(0, indentation.length - 2);

const stringify = (val, deep) => {
  if (lodash.isObject(val)) {
    const objectData = Object.entries(val).flat();
    const [key, value] = objectData;
    return `{\n${indent(deep)}  ${key}: ${value}\n${indentFromBraces(indent(deep))}}`;
  }
  return val;
};

const getRenderTree = (ast, deep = 1) => {
  const result = ast.map((item) => {
    const {
      type,
      key,
      newValue,
      oldValue,
      children,
    } = item;

    if (Array.isArray(children)) {
      return (`${indent(deep)}  ${key}: ${getRenderTree(children, deep + 2)}`);
    } if (type === 'unchanged') {
      return (`${indent(deep)}  ${key}: ${stringify(newValue, deep + 2)}`);
    } if (type === 'added') {
      return (`${indent(deep)}+ ${key}: ${stringify(newValue, deep + 2)}`);
    } if (type === 'deleted') {
      return (`${indent(deep)}- ${key}: ${stringify(oldValue, deep + 2)}`);
    } if (type === 'changed') {
      return (`${indent(deep)}+ ${key}: ${stringify(newValue, deep + 2)}\n${indent(deep)}- ${key}: ${stringify(oldValue, deep + 2)}`);
    }
    return item;
  });
  const string = `{\n${result.join('\n')}\n${indentFromBraces(indent(deep))}}`;
  return string;
};

export default getRenderTree;

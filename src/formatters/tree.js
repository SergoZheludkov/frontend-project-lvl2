import _ from 'lodash';

const getIndent = (repetitions) => '  '.repeat(repetitions);
const getIndentFromBraces = (indentation) => indentation.slice(0, indentation.length - 2);

const stringify = (val, deep) => {
  if (!_.isObject(val)) {
    return val;
  }
  const objectData = Object.entries(val).flat();
  const [key, value] = objectData;
  return `{\n${getIndent(deep)}  ${key}: ${value}\n${getIndentFromBraces(getIndent(deep))}}`;
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

    switch (type) {
      case 'deleted':
        return (`${getIndent(deep)}- ${key}: ${stringify(oldValue, deep + 2)}`);

      case 'added':
        return (`${getIndent(deep)}+ ${key}: ${stringify(newValue, deep + 2)}`);

      case 'changed':
        return (`${getIndent(deep)}+ ${key}: ${stringify(newValue, deep + 2)}\n${getIndent(deep)}- ${key}: ${stringify(oldValue, deep + 2)}`);

      case 'unchanged':
        return (`${getIndent(deep)}  ${key}: ${stringify(newValue, deep + 2)}`);

      case 'depth':
        return (`${getIndent(deep)}  ${key}: ${getRenderTree(children, deep + 2)}`);

      default:
        return null;
    }
  });
  const string = `{\n${result.join('\n')}\n${getIndentFromBraces(getIndent(deep))}}`;
  return string;
};

export default getRenderTree;

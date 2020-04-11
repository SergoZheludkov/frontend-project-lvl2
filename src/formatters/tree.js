import _ from 'lodash';

const getIndent = (repetitions) => '  '.repeat(repetitions);
const getIndentFromBraces = (repetitions) => '  '.repeat(repetitions - 1);

const stringify = (val, depth) => {
  if (!_.isObject(val)) {
    return val;
  }
  const objectData = Object.entries(val).flat();
  const [key, value] = objectData;
  return `{\n${getIndent(depth)}  ${key}: ${value}\n${getIndentFromBraces(depth)}}`;
};

const getRenderTree = (ast, depth = 1) => {
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
        return `${getIndent(depth)}- ${key}: ${stringify(oldValue, depth + 2)}`;

      case 'added':
        return `${getIndent(depth)}+ ${key}: ${stringify(newValue, depth + 2)}`;

      case 'changed':
        return `${getIndent(depth)}+ ${key}: ${stringify(newValue, depth + 2)}\n${getIndent(depth)}- ${key}: ${stringify(oldValue, depth + 2)}`;

      case 'unchanged':
        return `${getIndent(depth)}  ${key}: ${stringify(newValue, depth + 2)}`;

      case 'nested':
        return `${getIndent(depth)}  ${key}: ${getRenderTree(children, depth + 2)}`;

      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  const string = `{\n${result.join('\n')}\n${getIndentFromBraces(depth)}}`;
  return string;
};

export default getRenderTree;

import lodash from 'lodash';

const stringify = (val, deep) => {
  const indent = '  '.repeat(deep);
  const indentFromBraces = indent.slice(0, indent.length - 2);
  if (lodash.isObject(val)) {
    const res = Object.entries(val).flat();
    const [key, value] = res;
    return `{\n${indent}  ${key}: ${value}\n${indentFromBraces}}`;
  }
  return val;
};

const doRender = (dataArray, deep = 1) => {
  const indent = '  '.repeat(deep);
  const result = dataArray.reduce((acc, item) => {
    const {
      type,
      key,
      value,
      children,
    } = item;

    if (Array.isArray(children)) {
      acc.push(`${indent}${type} ${key}: ${doRender(children, deep + 2)}`);
    } else {
      acc.push(`${indent}${type} ${key}: ${stringify(value, deep + 2)}`);
    }

    return acc;
  }, []);
  const indentFromBraces = indent.slice(0, indent.length - 2);
  const string = `{\n${result.join('\n')}\n${indentFromBraces}}`;
  return string;
};

export default doRender;

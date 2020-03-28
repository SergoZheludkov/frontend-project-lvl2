import lodash from 'lodash';

const checkValue = (val) => (lodash.isObject(val) ? '[complex value]' : val);

const getRenderPlain = (ast, path = '') => {
  const resultArray = ast
    .filter((item) => !(item.children === undefined && item.type === 'unchanged'))
    .map((item) => {
      const {
        type,
        key,
        oldValue,
        newValue,
        children,
      } = item;

      const fullPath = `${path}.${key}`;

      if (Array.isArray(children)) {
        return getRenderPlain(children, fullPath);
      } if (type === 'changed') {
        return (`Property '${fullPath.slice(1)}' was changed from '${checkValue(oldValue)}' to '${checkValue(newValue)}'`);
      } if (type === 'deleted') {
        return (`Property '${fullPath.slice(1)}' was deleted`);
      } if (type === 'added') {
        return (`Property '${fullPath.slice(1)}' was added with value: '${checkValue(newValue)}'`);
      }
      return item;
    });

  return resultArray.join('\n');
};

export default getRenderPlain;

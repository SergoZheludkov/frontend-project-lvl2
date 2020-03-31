import _ from 'lodash';

const checkValue = (val) => (_.isObject(val) ? '[complex value]' : val);

const getRenderPlain = (ast, path = '') => {
  const resultArray = ast
    .filter((item) => !(item.children !== 'depth' && item.type === 'unchanged'))
    .map((item) => {
      const {
        type,
        key,
        oldValue,
        newValue,
        children,
      } = item;

      const fullPath = `${path}.${key}`;

      switch (type) {
        case 'deleted':
          return (`Property '${fullPath.slice(1)}' was deleted`);

        case 'added':
          return (`Property '${fullPath.slice(1)}' was added with value: '${checkValue(newValue)}'`);

        case 'changed':
          return (`Property '${fullPath.slice(1)}' was changed from '${checkValue(oldValue)}' to '${checkValue(newValue)}'`);

        case 'depth':
          return getRenderPlain(children, fullPath);

        default:
          return null;
      }
    });
  return resultArray.join('\n');
};

export default getRenderPlain;

import _ from 'lodash';

const stringify = (val) => (_.isObject(val) ? '[complex value]' : val);

const getRenderPlain = (ast, path = '') => {
  const resultArray = ast
    .filter((item) => !(item.type !== 'depth' && item.type === 'unchanged'))
    .map((item) => {
      const {
        type,
        key,
        oldValue,
        newValue,
        children,
      } = item;

      const fullPath = `${path}${key}`;

      switch (type) {
        case 'deleted':
          return `Property '${fullPath}' was deleted`;

        case 'added':
          return `Property '${fullPath}' was added with value: '${stringify(newValue)}'`;

        case 'changed':
          return `Property '${fullPath}' was changed from '${stringify(oldValue)}' to '${stringify(newValue)}'`;

        case 'nested':
          return getRenderPlain(children, `${fullPath}.`);

        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  return resultArray.join('\n');
};

export default getRenderPlain;

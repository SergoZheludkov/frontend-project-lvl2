import lodash from 'lodash';

const checkValue = (val) => (lodash.isObject(val) ? '[complex value]' : val);
const fullWay = [];

const getRenderPlain = (dataArray) => {
  const resultArray = dataArray.reduce((acc, item) => {
    const {
      type,
      key,
      oldValue,
      newValue,
      children,
    } = item;
    fullWay.push(key);
    const deep = fullWay.join('.');

    if (Array.isArray(children)) {
      acc.push(getRenderPlain(children));
      fullWay.length = 0;
    } else if (type === 'changed') {
      acc.push(`Property '${deep}' was changed from '${checkValue(oldValue)}' to '${checkValue(newValue)}'`);
    } else if (type === 'deleted') {
      acc.push(`Property '${deep}' was deleted`);
    } else if (type === 'added') {
      acc.push(`Property '${deep}' was added with value: '${checkValue(newValue)}'`);
    }

    fullWay.pop();
    return acc;
  }, []).flat();

  return resultArray.join('\n');
};

export default getRenderPlain;

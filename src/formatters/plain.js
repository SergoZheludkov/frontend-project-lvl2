import lodash from 'lodash';

const checkValue = (val) => (lodash.isObject(val) ? '[complex value]' : val);
const fullWay = [];

const getRenderPlain = (dataArray) => {
  const resultArray = dataArray.reduce((acc, item, ind, data) => {
    const {
      type,
      key,
      value,
      children,
    } = item;


    const previousKey = ind > 0 ? data[ind - 1].key : null;
    const nextKey = ind < data.length - 1 ? data[ind + 1].key : null;
    const previousValue = ind > 0 ? checkValue(data[ind - 1].value) : null;
    const displayedValue = checkValue(value);
    const addedElement = type === '+';
    const deletedElement = type === '-';


    if (Array.isArray(children)) {
      fullWay.push(key);
      acc.push(getRenderPlain(children));
      fullWay.length = 0;
    } else if (key === previousKey) {
      fullWay.push(key);
      const change = addedElement ? displayedValue : previousValue;
      const previousChange = addedElement ? previousValue : displayedValue;
      acc.push(`Property '${fullWay.join('.')}' was changed from '${previousChange}' to '${change}'`);
      fullWay.pop();
    } else if (key !== nextKey) {
      if (deletedElement) {
        fullWay.push(key);
        acc.push(`Property '${fullWay.join('.')}' was deleted`);
        fullWay.pop();
      } else if (addedElement) {
        fullWay.push(key);
        acc.push(`Property '${fullWay.join('.')}' was added with value: '${displayedValue}'`);
        fullWay.pop();
      }
    }

    return acc;
  }, []).flat();


  return resultArray.join('\n');
};

export default getRenderPlain;

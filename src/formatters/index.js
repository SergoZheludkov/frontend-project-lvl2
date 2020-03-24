import getRenderTree from './tree';
import getRenderPlain from './plain';
import getRenderJson from './json';

const getFormatRender = (format) => {
  let result;
  switch (format) {
    case 'tree':
      result = getRenderTree;
      break;

    case 'plain':
      result = getRenderPlain;
      break;

    case 'json':
      result = getRenderJson;
      break;

    default:
      break;
  }
  return result;
};

export default getFormatRender;

import getRenderTree from './renderToTree';
import getRenderPlain from './renderToPlain';

const getFormatRender = (format) => {
  let result;
  switch (format) {
    case 'tree':
      result = getRenderTree;
      break;

    case 'plain':
      result = getRenderPlain;
      break;

    default:
      break;
  }
  return result;
};

export default getFormatRender;

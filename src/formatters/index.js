import getRenderTree from './tree';
import getRenderPlain from './plain';
import getRenderJson from './json';

const getFormatRender = (format) => {
  const formatters = { tree: getRenderTree, plain: getRenderPlain, json: getRenderJson };
  return formatters[format];
};

export default getFormatRender;

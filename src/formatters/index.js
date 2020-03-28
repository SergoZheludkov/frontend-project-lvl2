import getRenderTree from './tree';
import getRenderPlain from './plain';
import getRenderJson from './json';

const formatters = {
  tree: getRenderTree,
  plain: getRenderPlain,
  json: getRenderJson,
};

export default (format) => formatters[format];

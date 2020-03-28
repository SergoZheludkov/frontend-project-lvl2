import yaml from 'js-yaml';
import ini from 'ini';

const formatters = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, format) => formatters[format](data);

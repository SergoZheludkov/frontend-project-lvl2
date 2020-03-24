import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const getParser = (format) => {
  const formatters = { json: JSON.parse, yml: yaml.safeLoad, ini: ini.parse };
  return formatters[format];
};

const getDataFile = (link) => {
  const normalLink = path.resolve(process.cwd(), link);
  const format = path.extname(link).slice(1);
  const parser = getParser(format);
  const fileData = parser(fs.readFileSync(normalLink, 'utf8'));
  return fileData;
};

export default getDataFile;

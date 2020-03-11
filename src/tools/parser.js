import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const getParser = (format) => {
  let parse;
  switch (format) {
    case '.json':
      parse = JSON.parse;
      break;

    case '.yml':
      parse = yaml.safeLoad;
      break;

    case '.ini':
      parse = ini.parse;
      break;

    default:
      break;
  }
  return parse;
};

const getDataFile = (link) => {
  const normalLink = path.resolve(process.cwd(), link);
  const format = path.extname(link);
  const parser = getParser(format);
  const fileData = parser(fs.readFileSync(normalLink, 'utf8'));
  return fileData;
};

export default getDataFile;

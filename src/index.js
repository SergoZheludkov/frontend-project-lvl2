import fs from 'fs';
import path from 'path';
import getFormatRender from './formatters';
import getParse from './parser';
import getAst from './ast';

const getDataFile = (pathToFile) => {
  const normalPath = path.resolve(process.cwd(), pathToFile);
  const format = path.extname(pathToFile).slice(1);
  const data = fs.readFileSync(normalPath, 'utf8');
  const parseData = getParse(data, format);
  return parseData;
};

const genDiff = (path1, path2, format) => {
  const firstFileData = getDataFile(path1);
  const secondFileData = getDataFile(path2);
  const ast = getAst(firstFileData, secondFileData);
  const render = getFormatRender(format);
  const result = render(ast);
  return result;
};

export default genDiff;

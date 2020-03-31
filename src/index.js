import fs from 'fs';
import path from 'path';
import getFormatRender from './formatters';
import getParse from './parser';
import getAst from './ast';

const getFileData = (pathToFile) => {
  const normalPath = path.resolve(process.cwd(), pathToFile);
  const format = path.extname(pathToFile).slice(1);
  const data = fs.readFileSync(normalPath, 'utf8');
  const parseData = getParse(data, format);
  return parseData;
};

const genDiff = (beforePath, afterPath, format) => {
  const firstFileData = getFileData(beforePath);
  const secondFileData = getFileData(afterPath);
  const ast = getAst(firstFileData, secondFileData);
  const render = getFormatRender(format);
  const result = render(ast);
  return result;
};

export default genDiff;

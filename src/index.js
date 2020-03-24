import getFormatRender from './formatters';
import getDataFile from './tools/parser';
import getAst from './tools/ast';

const showTheDifferences = (link1, link2, format) => {
  const firstFileData = getDataFile(link1);
  const secondFileData = getDataFile(link2);
  const ast = getAst(firstFileData, secondFileData);
  const render = getFormatRender(format);
  const result = render(ast);
  return result;
};

export default showTheDifferences;

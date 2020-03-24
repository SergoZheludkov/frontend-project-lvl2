import fs from 'fs';
import showMeTheDifferences from '../src';

const getResult = (link) => fs.readFileSync(link, 'utf8');

const resultTreeLink = `${__dirname}/fixtures/resultTree.txt`;
const resultPlainLink = `${__dirname}/fixtures/resultPlain.txt`;
const resultJsonLink = `${__dirname}/fixtures/resultJson.txt`;

const jsonLink1 = `${__dirname}/fixtures/before.json`;
const jsonLink2 = `${__dirname}/fixtures/after.json`;

const yamlLink1 = `${__dirname}/fixtures/before.yml`;
const yamlLink2 = `${__dirname}/fixtures/after.yml`;

const iniLink1 = `${__dirname}/fixtures/before.ini`;
const iniLink2 = `${__dirname}/fixtures/after.ini`;


describe('AllFormaters', () => {
  test('Tree', () => {
    expect(showMeTheDifferences(jsonLink1, jsonLink2, 'tree')).toEqual(getResult(resultTreeLink));
    expect(showMeTheDifferences(yamlLink1, yamlLink2, 'tree')).toEqual(getResult(resultTreeLink));
    expect(showMeTheDifferences(iniLink1, iniLink2, 'tree')).toEqual(getResult(resultTreeLink));
  });
  test('Plain', () => {
    expect(showMeTheDifferences(jsonLink1, jsonLink2, 'plain')).toEqual(getResult(resultPlainLink));
    expect(showMeTheDifferences(yamlLink1, yamlLink2, 'plain')).toEqual(getResult(resultPlainLink));
    expect(showMeTheDifferences(iniLink1, iniLink2, 'plain')).toEqual(getResult(resultPlainLink));
  });
  test('JSON', () => {
    expect(showMeTheDifferences(jsonLink1, jsonLink2, 'json')).toEqual(getResult(resultJsonLink));
    expect(showMeTheDifferences(yamlLink1, yamlLink2, 'json')).toEqual(getResult(resultJsonLink));
    expect(showMeTheDifferences(iniLink1, iniLink2, 'json')).toEqual(getResult(resultJsonLink));
  });
});

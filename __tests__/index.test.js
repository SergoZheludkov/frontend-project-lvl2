import showMeTheDifferences from '../src';

describe('showMeTheDifferences', () => {
  const result1 = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

  const jsonLink1 = `${__dirname}/fixtures/before.json`;
  const jsonLink2 = `${__dirname}/fixtures/after.json`;
  const yamlLink1 = `${__dirname}/fixtures/before.yml`;
  const yamlLink2 = `${__dirname}/fixtures/after.yml`;
  const iniLink1 = `${__dirname}/fixtures/before.yml`;
  const iniLink2 = `${__dirname}/fixtures/after.yml`;

  test('json', () => {
    expect(showMeTheDifferences(jsonLink1, jsonLink2)).toEqual(result1);
  });
  test('yaml', () => {
    expect(showMeTheDifferences(yamlLink1, yamlLink2)).toEqual(result1);
  });
  test('ini', () => {
    expect(showMeTheDifferences(iniLink1, iniLink2)).toEqual(result1);
  });
});

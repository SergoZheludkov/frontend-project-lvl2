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
  const iniLink1 = `${__dirname}/fixtures/before.ini`;
  const iniLink2 = `${__dirname}/fixtures/after.ini`;

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

/*describe('showMeTheDifferences Recursion', () => {
  const result1 = `{
      common: {
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      + nest: str
      - nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

  const jsonLink1 = `${__dirname}/fixtures/before-tree.json`;
  const jsonLink2 = `${__dirname}/fixtures/after-tree.json`;

  test('json', () => {
    expect(showMeTheDifferences(jsonLink1, jsonLink2)).toEqual(result1);
  });
});*/

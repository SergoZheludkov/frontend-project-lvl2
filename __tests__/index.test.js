import showMeTheDifferences from '../src';

describe('showMeTheDifferences Recursion', () => {
  const result1 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            key: value
          + ops: vops
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
  const yamlLink1 = `${__dirname}/fixtures/before-tree.yml`;
  const yamlLink2 = `${__dirname}/fixtures/after-tree.yml`;
  const iniLink1 = `${__dirname}/fixtures/before-tree.ini`;
  const iniLink2 = `${__dirname}/fixtures/after-tree.ini`;

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

import showMeTheDifferences from '../src';

describe('Tree', () => {
  const result = `{
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
    expect(showMeTheDifferences(jsonLink1, jsonLink2, 'tree')).toEqual(result);
  });
  test('yaml', () => {
    expect(showMeTheDifferences(yamlLink1, yamlLink2, 'tree')).toEqual(result);
  });
  test('ini', () => {
    expect(showMeTheDifferences(iniLink1, iniLink2, 'tree')).toEqual(result);
  });
});

describe('Plain', () => {
  const result = `Property 'common.follow' was added with value: 'false'
Property 'common.setting2' was deleted
Property 'common.setting3' was changed from 'true' to '[complex value]'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: '[complex value]'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from '[complex value]' to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: '[complex value]'`;

  const jsonLink1 = `${__dirname}/fixtures/before-tree.json`;
  const jsonLink2 = `${__dirname}/fixtures/after-tree.json`;
  const yamlLink1 = `${__dirname}/fixtures/before-tree.yml`;
  const yamlLink2 = `${__dirname}/fixtures/after-tree.yml`;
  const iniLink1 = `${__dirname}/fixtures/before-tree.ini`;
  const iniLink2 = `${__dirname}/fixtures/after-tree.ini`;

  test('json', () => {
    expect(showMeTheDifferences(jsonLink1, jsonLink2, 'plain')).toEqual(result);
  });
  test('yaml', () => {
    expect(showMeTheDifferences(yamlLink1, yamlLink2, 'plain')).toEqual(result);
  });
  test('ini', () => {
    expect(showMeTheDifferences(iniLink1, iniLink2, 'plain')).toEqual(result);
  });
});

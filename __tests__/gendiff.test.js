import gendiff from '../src';

describe('gendiff', () => {
  const result = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

  const link1 = '__tests__/fixtures/before.json';
  const link2 = '__tests__/fixtures/after.json';
  const normalLink1 = '/Users/sergo/Library/Projects/frontend-project-lvl2/__tests__/fixtures/before.json';
  const normalLink2 = '/Users/sergo/Library/Projects/frontend-project-lvl2/__tests__/fixtures/after.json';

  test('Absolute Path', () => {
    expect(gendiff(normalLink1, normalLink2)).toEqual(result);
  });
  test('Relative Path', () => {
    expect(gendiff(link1, link2)).toEqual(result);
  });
});

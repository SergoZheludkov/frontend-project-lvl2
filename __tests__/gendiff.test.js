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

  const link1 = `${__dirname}/fixtures/before.json`;
  const link2 = `${__dirname}/fixtures/after.json`;

  test('Relative Path', () => {
    expect(gendiff(link1, link2)).toEqual(result);
  });
});

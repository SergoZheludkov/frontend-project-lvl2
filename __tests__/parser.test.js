import ini from 'ini';
import yaml from 'js-yaml';
import getMeParser from '../src/parser';

describe('getMeParser', () => {
  test('parse', () => {
    expect(getMeParser('.json')).toBe(JSON.parse);
    expect(getMeParser('.yml')).toBe(yaml.safeLoad);
    expect(getMeParser('.ini')).toBe(ini.parse);
  });
});

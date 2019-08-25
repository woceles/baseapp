import { PASSWORD_REGEX } from './constants';

describe('Constants regexps', () => {
  it('should validate correct passwords', () => {
    expect('1azeRTY@'.match(PASSWORD_REGEX)).toBeTruthy();
    expect('1aze@RTY'.match(PASSWORD_REGEX)).toBeTruthy();
    expect('azeRTY@2'.match(PASSWORD_REGEX)).toBeTruthy();
    expect('azeRTY@222222222'.match(PASSWORD_REGEX)).toBeTruthy();
  });

  it('should validate correct passwords in non latin languages', () => {
    expect('йцукRTY@2'.match(PASSWORD_REGEX)).toBeTruthy();
    expect('azeЙЦУК@3'.match(PASSWORD_REGEX)).toBeTruthy();
  });

  it('should not validate incorrect passwords', () => {
    expect(''.match(PASSWORD_REGEX)).toBeNull();
    expect('12345678'.match(PASSWORD_REGEX)).toBeNull();
    expect('abcdefgh'.match(PASSWORD_REGEX)).toBeNull();
    expect('ABCDEFGH'.match(PASSWORD_REGEX)).toBeNull();
    expect('aaaaBBBB'.match(PASSWORD_REGEX)).toBeNull();
    expect('aZ1@'.match(PASSWORD_REGEX)).toBeNull();
    expect('1az@RTY'.match(PASSWORD_REGEX)).toBeNull();
  });
});

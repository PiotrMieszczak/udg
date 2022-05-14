import { assertProperties, parseKeysToLowerCase } from './utils';

describe('Utils', () => {
  it('should assert properties', () => {
    const objectMock = { user: 1, title: '', body: '' };
    const condition = assertProperties(['title', 'body'], objectMock);

    expect(condition).toBeTruthy();
  });

  it('should parse keys to lower keys', () => {
    const objectMock = [{ user: 1, title: '', body: '' }];
    const lowerCaseMock = [{ User: 1, Title: '', Body: '' }];
    const condition = parseKeysToLowerCase(lowerCaseMock);

    expect(condition).toStrictEqual(objectMock);
  });
});

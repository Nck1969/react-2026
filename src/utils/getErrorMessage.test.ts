import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('should return message from SerializedError', () => {
    const result = getErrorMessage({ message: 'Something failed' });

    expect(result).toBe('Something failed');
  });

  it('should return message from FetchBaseQueryError', () => {
    const result = getErrorMessage({ status: 404, data: 'Not found' });

    expect(result).toBe('Not found');
  });

  it('should returns fallback', () => {
    const result = getErrorMessage({});

    expect(result).toBe('Pokemon not found');
  });
});

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
) => {
  if ('status' in error) {
    return typeof error.data === 'string'
      ? error.data
      : JSON.stringify(error.data);
  }

  if (error.message) {
    return error.message;
  }

  return 'Pokemon not found';
};

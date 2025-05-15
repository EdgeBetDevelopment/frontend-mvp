interface ErrorResponse {
  code?: number;
  message?: string;
}

export const getFetchError = (
  error: ErrorResponse,
  defaultMessage: string = 'Something went wrong',
): string => {
  if (!error) return defaultMessage;

  console.log('error', error);

  if (error?.code === 500) {
    return 'Something wrong, try later or again';
  }

  return error?.message || defaultMessage;
};

export const handleFetchError = (
  error: ErrorResponse | null,
  defaultMessage: string = 'Something went wrong',
) => {
  if (!error) return null;

  console.error(error);
  return getFetchError(error, defaultMessage);
};

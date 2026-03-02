import { toast } from 'sonner';

interface ErrorResponse {
  code?: number;
  message?: string;
}

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

export const getFetchError = (
  error: ErrorResponse,
  defaultMessage: string = 'Something went wrong',
): string => {
  if (!error) return defaultMessage;

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

/**
 * Extracts error message from various error formats (Axios, generic errors)
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'An error occurred'
): string => {
  if (!error) return defaultMessage;

  // Handle Axios errors
  const axiosError = error as AxiosErrorResponse;
  if (axiosError?.response?.data?.message) {
    return axiosError.response.data.message;
  }
  if (axiosError?.response?.data?.error) {
    return axiosError.response.data.error;
  }

  // Handle generic Error objects
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  return defaultMessage;
};

/**
 * Handles mutation errors with consistent toast and logging
 */
export const handleMutationError = (
  error: unknown,
  defaultMessage: string = 'An error occurred'
): void => {
  const message = getErrorMessage(error, defaultMessage);
  toast.error(message);
  console.error('Mutation error:', error);
};

/**
 * Creates a mutation error handler with a custom default message
 */
export const createMutationErrorHandler = (defaultMessage: string) => {
  return (error: unknown): void => {
    handleMutationError(error, defaultMessage);
  };
};

import qs from 'qs';

interface IFormUrlQueryProps {
  params: string;
  key?: string;
  value?: string | null;
  pathname?: string;
  keysToRemove?: string[];
}

export function formUrlQuery({
  params,
  key,
  value,
  pathname,
  keysToRemove,
}: IFormUrlQueryProps) {
  const currentUrl = qs.parse(params);
  const currentPathname = pathname ? pathname : window.location.pathname;

  if (keysToRemove) {
    keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove];
    });
  } else if (key && (value === '' || value === null)) {
    delete currentUrl[key];
  } else if (key && value) {
    currentUrl[key] = value;
  }

  return `${currentPathname}?${qs.stringify(currentUrl, { skipNulls: true })}`;
}

export const buildQueryUrl = (options: {
  pathname: string;
  params?: Record<string, string | number | string[] | undefined>;
  existingParams?: URLSearchParams;
}): string => {
  const query = options.existingParams
    ? new URLSearchParams(options.existingParams.toString())
    : new URLSearchParams();

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          const filtered = value.filter((v) => v !== '');
          if (filtered.length) query.set(key, filtered.join(','));
        }
      } else if (value !== undefined && value !== null && value !== '') {
        query.set(key, String(value));
      }
    });
  }

  const queryString = query.toString();
  return queryString ? `${options.pathname}?${queryString}` : options.pathname;
};

export const addQueryParams = (
  url: string,
  params: Record<string, string | number | undefined | null>,
): string => {
  const urlParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      urlParams.append(key, value.toString());
    }
  }

  return url + (urlParams.toString() ? `?${urlParams.toString()}` : '');
};

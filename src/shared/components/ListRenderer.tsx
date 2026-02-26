import React from 'react';

type ListRendererProps<T> = {
  isLoading: boolean;
  isError?: boolean;
  data: T[];
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  children: (data: T[]) => React.ReactNode;
};

function ListRenderer<T>({
  isLoading,
  isError = false,
  data,
  loadingComponent = <div>Loading...</div>,
  errorComponent = <div>Something went wrong</div>,
  emptyComponent = <div>No results found</div>,
  children,
}: ListRendererProps<T>) {
  if (isLoading) return <>{loadingComponent}</>;
  if (isError) return <>{errorComponent}</>;
  if (!data || data.length === 0) return <>{emptyComponent}</>;

  return <>{children(data)}</>;
}

export default ListRenderer;

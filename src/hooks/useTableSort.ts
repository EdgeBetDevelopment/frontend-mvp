import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SortItem = { field: string; direction: string };

function sortArrayToString(sortArr: SortItem[]): string {
  return sortArr.map((s: SortItem) => `${s.field}:${s.direction}`).join(',');
}

function sortStringToArray(sortStr: string): SortItem[] {
  if (!sortStr) return [];
  return sortStr.split(',').map((s: string) => {
    const [field, direction] = s.split(':');
    return { field, direction };
  });
}

export function useTableSort() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const sortParam = params.get('sort') || '';
  const sortArray = sortStringToArray(sortParam);
  const currentSort = sortArray[0] || { field: '', direction: '' };

  const handleSort = useCallback(
    (field: string) => {
      let direction: string | null = 'desc';
      if (currentSort.field === field) {
        if (currentSort.direction === 'desc') direction = 'asc';
        else if (currentSort.direction === 'asc') direction = null; // turn off
      }
      let url: string;
      if (direction) {
        const newSortArr = [{ field, direction }];
        const sortStr = sortArrayToString(newSortArr);
        const u = new URL(window.location.href);
        u.searchParams.set('sort', sortStr);
        url = pathname + u.search;
      } else {
        const u = new URL(window.location.href);
        u.searchParams.delete('sort');
        url = pathname + u.search;
      }
      router.replace(url);
    },
    [currentSort, pathname, router],
  );

  return { sortArray, currentSort, handleSort };
}

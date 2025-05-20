'use client';

import * as React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { FaCaretUp } from 'react-icons/fa';

import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  );
}

type TableHeadProps = React.ComponentProps<'th'> & {
  sortable?: boolean;
  sortKey?: string;
  currentSort?: { field: string; direction: string };
  onSort?: (field: string) => void;
  children: React.ReactNode;
};

function TableHead({
  className,
  sortable = false,
  sortKey = '',
  currentSort,
  onSort,
  children,
  ...props
}: TableHeadProps) {
  const handleClick = () => {
    if (sortable && onSort && sortKey) {
      onSort(sortKey);
    }
  };

  const isActive = currentSort && currentSort.field === sortKey;
  const isAsc = isActive && currentSort.direction === 'asc';
  const isDesc = isActive && currentSort.direction === 'desc';

  return (
    <th
      data-slot="table-head"
      className={cn(
        'bg-surface-primary text-text-primary h-10 px-2 py-[19px] text-left align-middle text-sm font-normal tracking-normal whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        sortable ? 'cursor-pointer select-none' : '',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      {sortable && (
        <span className="ml-1 inline-flex flex-col align-middle text-xs">
          <FaCaretUp
            className={
              '-mb-1 h-5 w-5 transition ' +
              (isAsc ? 'text-primary-brand' : 'text-gray-400 opacity-50')
            }
          />
          <FaCaretDown
            className={
              '-mt-1 h-5 w-5 transition ' +
              (isDesc ? 'text-primary-brand' : 'text-gray-400 opacity-50')
            }
          />
        </span>
      )}
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'text-text-primary p-2 py-[17px] align-middle text-sm font-normal tracking-normal whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

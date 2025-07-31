'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import { useTableSort } from '@/hooks/useTableSort';
import apiService from '@/services';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { formatUtcToLocalDate } from '@/utils/time';
import { formUrlQuery } from '@/utils/url';
import ListRenderer from '@/wrappers/ListRenderer';

const BET_TYPE_TABS = [
  { label: 'Active Bets', value: 'active' },
  { label: 'Completed Bets', value: 'completed' },
  { label: 'All Bets', value: 'all' },
];

const TABLE_FIELDS = [
  { label: 'Date', field: 'created_at', sortable: true },
  { label: 'Event', field: 'game.home_team', sortable: false },
  { label: 'Description', field: 'description', sortable: false },
  { label: 'Stake', field: 'amount', sortable: true },
  { label: 'Bet', field: 'odds_at_bet_time', sortable: true },
  { label: 'Status', field: 'status', sortable: false },
];

const BetTrackerTable = () => {
  const pathname = usePathname();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const type = params.get('type') || 'active';
  const sortParam = params.get('sort') || '';
  const [activeTab, setActiveTab] = useState(type);
  const { sortArray, currentSort, handleSort } = useTableSort();

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['betList', activeTab, sortParam],
    queryFn: () =>
      apiService.getBetList({ filter: activeTab, sort: sortArray } as any),
    staleTime: 1000 * 60 * 2,
    refetchOnMount: 'always',
    placeholderData: (prevData) => prevData,
  });
  console.log(data);
  const onChangeType = (value: string) => {
    if (value === type) return;
    setActiveTab(value);
    changeTypeInUrl(value);
  };

  const changeTypeInUrl = (value: string) => {
    let url = pathname;
    if (!value) {
      url = formUrlQuery({
        params: params.toString(),
        keysToRemove: ['type'],
      });
    } else {
      url = formUrlQuery({
        params: params.toString(),
        key: 'type',
        value,
      });
    }
    router.replace(url);
  };

  return (
    <div className="tl-container flex w-full flex-col gap-6">
      <div className="tl-flex-between">
        <div className="flex items-center gap-4">
          {BET_TYPE_TABS.map((tab) => (
            <Button
              key={tab.label}
              variant={activeTab === tab.value ? 'brand' : 'default'}
              onClick={() => onChangeType(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="">
        <ListRenderer
          isLoading={isLoading}
          data={data?.slice().reverse()}
          isError={!!error}
          errorComponent={<div>Error load a player</div>}
          loadingComponent={
            <Loader size="h-10 w-10" className="h-full w-full py-10" />
          }
          emptyComponent={
            <div>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    {TABLE_FIELDS.map((col) => (
                      <TableHead
                        key={col.field}
                        sortable={col.sortable}
                        sortKey={col.field}
                        currentSort={currentSort}
                        onSort={handleSort}
                      >
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              </Table>
              <EmptyPlaceholder
                title="No bets found"
                subtitle="You don't have any bets yet."
              />
            </div>
          }
        >
          {(bets) => (
            <Table>
              <TableHeader>
                <TableRow>
                  {TABLE_FIELDS?.map((col) => (
                    <TableHead
                      key={col.field}
                      sortable={col.sortable}
                      sortKey={col.field}
                      currentSort={currentSort}
                      onSort={handleSort}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {bets.map((bet) =>
                  bet?.selections?.map((selection, idx) => (
                    <TableRow key={`${bet.id}-${idx}`}>
                      <TableCell>
                        {formatUtcToLocalDate(bet?.created_at?.toString())}
                      </TableCell>
                      <TableCell>
                        {selection?.payload?.selected_team_name} vs{' '}
                        {selection?.game?.away_team}
                      </TableCell>
                      <TableCell>
                        You placed a bet of ${selection?.amount} on the{' '}
                        {selection?.payload?.description}
                      </TableCell>
                      <TableCell>{selection?.amount}</TableCell>
                      <TableCell>
                        {selection?.payload?.odds_at_bet_time}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="w-full max-w-[85px] py-2 capitalize"
                          variant={
                            bet?.status === 'win'
                              ? 'green'
                              : bet?.status === 'pending'
                                ? 'orange'
                                : 'red'
                          }
                        >
                          {bet.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>
          )}
        </ListRenderer>
      </div>
    </div>
  );
};

export default BetTrackerTable;

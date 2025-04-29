'use client';

import React from 'react';
import dayjs from 'dayjs';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import { useBetTracker } from '@/hooks/useBetTracker';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { formUrlQuery } from '@/utils/url';
import ListRenderer from '@/wrappers/ListRenderer';

const BET_TYPE_TABS = [
  { label: 'Active Bets', value: null },
  { label: 'Completed Bets', value: 'completed' },
  { label: 'All Bets', value: 'all' },
];

const BetTrackerTable = () => {
  const { data, error, isLoading } = useBetTracker();

  const pathname = usePathname();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error load a player</p>;
  if (!data) return <p>Player not found</p>;

  const type = params.get('type');

  const onChangeType = (value: string | null) => {
    if (value === type) return;

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

    router.push(url);
  };

  return (
    <div className="tl-container flex w-full flex-col gap-6">
      <div className="tl-flex-between">
        <div className="flex items-center gap-4">
          {BET_TYPE_TABS.map((tab) => (
            <Button
              key={tab.label}
              variant={type === tab.value ? 'brand' : 'default'}
              onClick={() => onChangeType(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="">
        <ListRenderer
          isLoading={false}
          data={data}
          loadingComponent={<div>Loading...</div>}
          emptyComponent={
            <div>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Stake</TableHead>
                    <TableHead>Bet</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
              <EmptyPlaceholder
                title="No bets found"
                subtitle="You don’t have any bets yet."
              />
            </div>
          }
        >
          {(bets) => (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Stake</TableHead>
                  <TableHead>Bet</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      {dayjs(data.created_at).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.prediction}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>{data.odds_at_bet_time}</TableCell>
                    <TableCell>
                      <Badge
                        className="w-full max-w-[85px] py-2 capitalize"
                        variant={
                          data.status === 'won'
                            ? 'green'
                            : data.status === 'pending'
                              ? 'orange'
                              : 'red'
                        }
                      >
                        {data.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ListRenderer>
      </div>
    </div>
  );
};

export default BetTrackerTable;

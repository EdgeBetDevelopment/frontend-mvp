'use client';

import React from 'react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
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

const TABLE_DATA = [
  {
    id: 1,
    date: '13/12/2020',
    event: 'Qorem ipsum dolor ',
    description: 'Philadelphia Eagles to win with -3.5 point spread',
    stake: '$100',
    bet: '1.6',
    status: 'low',
  },
  {
    id: 2,
    date: '13/12/2020',
    event: 'Qorem ipsum dolor ',
    description: 'Philadelphia Eagles to win with -3.5 point spread',
    stake: '$100',
    bet: '1.6',
    status: 'medium',
  },
  {
    id: 3,
    date: '08/11/2020',
    event: 'Qorem ipsum dolor ',
    description: 'Philadelphia Eagles to win with -3.5 point spread',
    stake: '$100',
    bet: '1.6',
    status: 'high',
  },
  {
    id: 4,
    date: '13/12/2020',
    event: 'Qorem ipsum dolor ',
    description: 'Philadelphia Eagles to win with -3.5 point spread',
    stake: '$100',
    bet: '1.6',
    status: 'low',
  },
  {
    id: 5,
    date: '13/12/2020',
    event: 'Qorem ipsum dolor ',
    description: 'Philadelphia Eagles to win with -3.5 point spread',
    stake: '$100',
    bet: '1.6',
    status: 'low',
  },
];

const BET_TYPE_TABS = [
  { label: 'Active Bets', value: null },
  { label: 'Completed Bets', value: 'completed' },
  { label: 'All Bets', value: 'all' },
];

const BetTrackerTable = () => {
  const pathname = usePathname();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
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
          data={TABLE_DATA}
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
              <TableBody>
                {bets.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.date}</TableCell>
                    <TableCell>{data.event}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.stake}</TableCell>
                    <TableCell>{data.bet}</TableCell>
                    <TableCell>
                      <Badge
                        className="w-full max-w-[85px] py-2 capitalize"
                        variant={
                          data.status === 'low'
                            ? 'green'
                            : data.status === 'medium'
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

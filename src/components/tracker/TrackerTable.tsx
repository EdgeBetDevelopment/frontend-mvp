'use client';

import dayjs from 'dayjs';

import { useBetTracker } from '@/hooks/useBetTracker';
import { Badge } from '@/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';

export const TrackerTable = () => {
  const { data, error, isLoading } = useBetTracker();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error load a player</p>;
  if (!data) return <p>Player not found</p>;

  return (
    <div className="flex w-full flex-col gap-6">
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
    </div>
  );
};

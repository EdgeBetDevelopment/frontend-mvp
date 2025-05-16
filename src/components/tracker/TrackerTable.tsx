'use client';

import { useBetTracker } from '@/hooks/useBetTracker';
import { Badge } from '@/ui/badge';
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
import EmptyPlaceholder from '../EmptyPlaceholder';

export const TrackerTable = () => {
  const { data, error, isLoading } = useBetTracker();

  if (isLoading)
    return (
      <Loader
        size="h-14 w-14"
        className="flex h-[70vh] w-full items-center justify-center"
      />
    );

  if (!!error)
    return (
      <EmptyPlaceholder
        title="Something went wrong"
        subtitle="We couldn't load your bet history. Please try again later."
      />
    );

  if (!data || data.length === 0)
    return (
      <EmptyPlaceholder
        title="No tracked bets"
        subtitle="You haven't tracked any bets yet."
      />
    );

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
                {formatUtcToLocalDate(data.created_at.toString())}
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

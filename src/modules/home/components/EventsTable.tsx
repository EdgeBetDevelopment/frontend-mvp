import React from 'react';

import { Badge } from '@/shared/components/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/table';
import { EVENTS_TABLE_DATA } from '../constants';

const EventsTableBlock = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col items-center gap-9">
          <h3 className="tl-heading1">Upcoming Major Events</h3>
          <p className="tl-paraghraph1 text-primary">
            Track the biggest sports events and get expert predictions with
            latest odds analysis.
          </p>
        </div>

        <EventsTable />
      </div>
    </div>
  );
};

export default EventsTableBlock;

export const EventsTable = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="tl-flex-between gap-4">
        <Select defaultValue="nba">
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Sport category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="nba">NBA</SelectItem>
            <SelectItem disabled value="ncaaf">
              NCAAF
            </SelectItem>
            <SelectItem disabled value="ncaaf-championship-winner">
              NCAAF Championship Winner
            </SelectItem>
            <SelectItem disabled value="nfl-super-bowl-winner">
              NFL Super Bowl Winner
            </SelectItem>
            <SelectItem disabled value="nfl">
              NFL
            </SelectItem>
            <SelectItem disabled value="basketball-euroleague">
              Basketball Euroleague
            </SelectItem>
            <SelectItem disabled value="ncaab">
              NCAAB
            </SelectItem>
            <SelectItem disabled value="ncaab-championship-winner">
              NCAAB Championship Winner
            </SelectItem>
            <SelectItem disabled value="mlb-world-series-winner">
              MLB World Series Winner
            </SelectItem>
            <SelectItem disabled value="mlb">
              MLB
            </SelectItem>
            <SelectItem disabled value="tennis">
              Tennis
            </SelectItem>
            <SelectItem disabled value="wta-tours">
              WTA Tours
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Prediction</TableHead>
            <TableHead>Odds</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {EVENTS_TABLE_DATA.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.prediction}</TableCell>
              <TableCell>{data.ods}</TableCell>
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
    </div>
  );
};

import React from 'react';

import { Badge } from '../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';

const TABLE_DATA = [
  {
    id: 1,
    name: 'NCAAF',
    date: '13/12/2020',
    prediction: 'Michigan vs Washington',
    ods: 'Michigan -4.5',
    status: 'low',
  },
  {
    id: 2,
    name: 'NFL',
    date: '13/12/2020',
    prediction: 'Chiefs vs Bills',
    ods: 'Chiefs -2.5',
    status: 'medium',
  },
  {
    id: 3,
    name: 'AFL',
    date: '08/11/2020',
    prediction: 'Collingwood vs Brisbane',
    ods: 'Collingwood +3.5',
    status: 'high',
  },
  {
    id: 4,
    name: 'NCAAF',
    date: '13/12/2020',
    prediction: 'Michigan vs Washington',
    ods: 'Michigan -4.5',
    status: 'low',
  },
  {
    id: 5,
    name: 'NCAAF',
    date: '13/12/2020',
    prediction: 'Michigan vs Washington',
    ods: 'Michigan -4.5',
    status: 'low',
  },
  {
    id: 6,
    name: 'NFL',
    date: '13/12/2020',
    prediction: 'Chiefs vs Bills',
    ods: 'Chiefs -2.5',
    status: 'medium',
  },
  {
    id: 7,
    name: 'AFL',
    date: '08/11/2020',
    prediction: 'Collingwood vs Brisbane',
    ods: 'Collingwood +3.5',
    status: 'high',
  },
  {
    id: 8,
    name: 'NCAAF',
    date: '13/12/2020',
    prediction: 'Michigan vs Washington',
    ods: 'Michigan -4.5',
    status: 'low',
  },
];

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
          {TABLE_DATA.map((data) => (
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

import './styles.css';

import React from 'react';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';

import TableBodyRow from './TableBodyRow';

const LeagueTable = () => {
  const TABLE_DATA = [
    {
      id: 1,
      name: 'NCAAF',
      wins: '80',
      draws: '15',
      losses: '17',
      description:
        'College Football predictions focusing on major conference games and bowl season matchups.',
      total_score: '21.55',
    },
    {
      id: 2,
      name: 'NFL Super Bowl Winner',
      wins: '76',
      draws: '20',
      losses: '12',
      description:
        'NFL playoff and Super Bowl predictions with emphasis on team performance trends and key matchups.',
      total_score: '22.45',
    },
    {
      id: 3,
      name: 'NFL Super Bowl Winner',
      wins: '91',
      draws: '40',
      losses: '11',
      description:
        'Comprehensive analysis of NFL championship contenders including player stats and historical data.',
      total_score: '20.85',
    },
    {
      id: 4,
      name: 'AFL',
      wins: '45',
      draws: '16',
      losses: '8',
      description:
        'Australian Football League predictions with focus on team form and head-to-head statistics.',
      total_score: '19.95',
    },
  ];

  return (
    <Table className="table-background-gradient w-full max-w-[926px]">
      <TableHeader className="table-header-bottom-shadow m-3 bg-[#484848]">
        <TableRow>
          <TableHead className="px-4 py-5 text-[14px] text-[#EBEBEB]">
            Name
          </TableHead>
          <TableHead className="px-4 py-5 text-[14px]">Wins</TableHead>
          <TableHead className="px-4 py-5 text-[14px]">Draws</TableHead>
          <TableHead className="px-4 py-5 text-[14px]">Losses</TableHead>
          <TableHead className="px-4 py-5 text-[14px]">Description</TableHead>
          <TableHead className="px-4 py-5 text-[14px]">Total score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TABLE_DATA.map((data) => (
          <React.Fragment key={data.id}>
            <TableBodyRow data={data} />
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeagueTable;

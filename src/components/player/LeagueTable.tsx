import './styles.css';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';

import { LeagueModal } from './LeagueModal';

interface Game {
  date: string;
  opponent: string;
  result: string;
  PTS: string;
  REB: string;
  AST: string;
  [key: string]: string;
}

interface LeagueTableProps {
  recentGames: Game[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ recentGames }) => {
  const [showModal, setShowModal] = useState(false);

  const renderTable = (games: Game[]) => (
    <Table
      className="w-full"
      style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}
    >
      <TableHeader className="table-header-bottom-shadow m-3">
        <TableRow>
          {['Date', 'Opponent', 'Result', 'PTS', 'REB', 'AST'].map(
            (title, i) => (
              <TableHead
                key={i}
                style={{
                  borderBottom: '1px solid var(--Border-primary, #484848)',
                  borderCollapse: `separate`,
                }}
                className={cn(
                  'bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]',
                  i === 0 && 'rounded-bl-[12px]',
                  i === 5 && 'rounded-br-[12px]',
                )}
              >
                {title}
              </TableHead>
            ),
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {games?.map((game, index) => (
          <TableRow
            key={index}
            className="transition-shadow duration-200"
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderRadius = '12px';
              e.currentTarget.style.boxShadow =
                'inset 0px 5px 6px 0px #8F8F8F40, inset 0px -5px 6px 0px #8F8F8F40';
              Array.from(e.currentTarget.children).forEach((cell) => {
                (cell as HTMLElement).style.borderBottom = '0';
              });
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderRadius = '0';
              Array.from(e.currentTarget.children).forEach((cell) => {
                (cell as HTMLElement).style.borderBottom = '1px solid #484848';
              });
            }}
          >
            <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px]">
              {game?.date}
            </TableCell>
            <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
              {game?.opponent}
            </TableCell>
            <TableCell
              className={cn(
                'border-b border-[#484848] px-4 py-5 text-[14px]',
                game?.result?.startsWith('W') && 'text-[#34D399]',
                game?.result?.startsWith('L') && 'text-[#DC2626]',
                !game?.result?.startsWith('W') &&
                  !game?.result?.startsWith('L') &&
                  'text-white',
              )}
            >
              {game?.result}
            </TableCell>
            <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
              {game?.PTS}
            </TableCell>
            <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
              {game?.REB}
            </TableCell>
            <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px]">
              {game?.AST}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="w-full max-w-[766px]">
      <div className="table-background-gradient w-full overflow-hidden rounded-2xl p-3">
        {renderTable(recentGames?.slice(0, 5))}
      </div>

      <div className="mt-4 text-center">
        <button
          className="cursor-pointer rounded-lg bg-[#34a1d3] px-6 py-2 text-white"
          onClick={() => setShowModal(true)}
        >
          View All Games
        </button>
      </div>

      <LeagueModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="mb-4 text-xl font-semibold text-white">All Games</h2>
        <div className="max-h-[60vh] overflow-auto pr-2">
          {renderTable(recentGames)}
        </div>
      </LeagueModal>
    </div>
  );
};

export default LeagueTable;

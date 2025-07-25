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

interface GameStats {
  PTS: string;
  REB: string;
  AST: string;
  [key: string]: string;
}

interface Game {
  date: string;
  opponent: string;
  result: string;
  stats: GameStats;
}

interface LeagueTableProps {
  recentGames: Game[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ recentGames }) => {
  const [showAllGames, setShowAllGames] = useState(false);

  const handleToggleGames = () => {
    setShowAllGames((prev) => !prev);
  };

  let gamesToShow;

  if (recentGames)
    gamesToShow = showAllGames ? recentGames : recentGames.slice(0, 5);

  return (
    <div className="w-full max-w-[766px]">
      <div className="table-background-gradient w-full max-w-[766px] overflow-hidden rounded-2xl p-3">
        <Table
          className="w-full"
          style={{
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
          }}
        >
          <TableHeader className="table-header-bottom-shadow m-3">
            <TableRow>
              <TableHead
                style={{
                  borderBottom: '1px solid var(--Border-primary, #484848)',
                  borderCollapse: `separate`,
                }}
                className={cn(
                  'rounded-bl-[12px] bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]',
                )}
              >
                Date
              </TableHead>
              <TableHead
                style={{
                  borderBottom: '1px solid var(--Border-primary, #484848)',
                  borderCollapse: `separate`,
                }}
                className="bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]"
              >
                Opponent
              </TableHead>
              <TableHead
                style={{
                  borderBottom: '1px solid var(--Border-primary, #484848)',
                  borderCollapse: `separate`,
                }}
                className="bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]"
              >
                Result
              </TableHead>
              <TableHead
                style={{
                  borderBottom: '1px solid var(--Border-primary, #484848)',
                  borderCollapse: `separate`,
                }}
                className="bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]"
              >
                PTS
              </TableHead>
              <TableHead
                style={{
                  borderBottom: '1px solid var(--Border-primary, #484848)',
                  borderCollapse: `separate`,
                }}
                className="bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]"
              >
                REB
              </TableHead>
              <TableHead
                style={{
                  borderBottom: '1px solid var(--Border-primary, #484848)',
                  borderCollapse: `separate`,
                }}
                className={cn(
                  'overflow-hidden rounded-br-[12px] bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]',
                )}
              >
                AST
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {gamesToShow?.map((game, index) => (
              <TableRow
                key={index}
                style={{
                  cursor: 'pointer',
                }}
                className="transition-shadow duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopLeftRadius = '12px';
                  e.currentTarget.style.borderTopRightRadius = '12px';
                  e.currentTarget.style.borderBottomLeftRadius = '12px';
                  e.currentTarget.style.borderBottomRightRadius = '12px';
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
                    (cell as HTMLElement).style.borderBottom =
                      '1px solid #484848';
                  });
                }}
              >
                <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px]">
                  {game.date}
                </TableCell>
                <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
                  {game.opponent}
                </TableCell>
                <TableCell
                  className={cn(
                    'border-b border-[#484848] px-4 py-5 text-[14px]',
                    game.result.startsWith('W') && 'text-[#34D399]',
                    game.result.startsWith('L') && 'text-[#DC2626]',
                    !game.result.startsWith('W') &&
                      !game.result.startsWith('L') &&
                      'text-white',
                  )}
                >
                  {game.result}
                </TableCell>
                <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
                  {game.stats.PTS}
                </TableCell>
                <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
                  {game.stats.REB}
                </TableCell>
                <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px]">
                  {game.stats.AST}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 text-center">
        <button
          className="rounded-lg bg-[#34a1d3] px-6 py-2 text-white"
          onClick={handleToggleGames}
        >
          {showAllGames ? 'Show Less' : 'View All Games'}
        </button>
      </div>
    </div>
  );
};

export default LeagueTable;

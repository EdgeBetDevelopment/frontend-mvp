import './styles.css';

import React, { useState } from 'react';

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
      <Table className="table-background-gradient w-full">
        <TableHeader className="table-header-bottom-shadow m-3 bg-[#484848]">
          <TableRow>
            <TableHead className="px-4 py-5 text-[14px] text-[#EBEBEB]">
              Date
            </TableHead>
            <TableHead className="px-4 py-5 text-[14px] text-[#EBEBEB]">
              Opponent
            </TableHead>
            <TableHead className="px-4 py-5 text-[14px] text-[#EBEBEB]">
              Result
            </TableHead>
            <TableHead className="px-4 py-5 text-[14px] text-[#EBEBEB]">
              PTS
            </TableHead>
            <TableHead className="px-4 py-5 text-[14px] text-[#EBEBEB]">
              REB
            </TableHead>
            <TableHead className="px-4 py-5 text-[14px] text-[#EBEBEB]">
              AST
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {gamesToShow?.map((game, index) => (
            <TableRow key={index}>
              <TableCell className="px-4 py-5 text-[14px]">
                {game.date}
              </TableCell>
              <TableCell className="px-4 py-5 text-[14px]">
                {game.opponent}
              </TableCell>
              <TableCell className="px-4 py-5 text-[14px]">
                {game.result}
              </TableCell>
              <TableCell className="px-4 py-5 text-[14px]">
                {game.stats.PTS}
              </TableCell>
              <TableCell className="px-4 py-5 text-[14px]">
                {game.stats.REB}
              </TableCell>
              <TableCell className="px-4 py-5 text-[14px]">
                {game.stats.AST}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

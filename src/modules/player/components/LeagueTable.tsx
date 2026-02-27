import React, { useState } from "react";

import { cn } from "@/shared/utils/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table";

import { LeagueModal } from "./LeagueModal";

interface Game {
  title?: string;
  date?: string;
  opponent?: string;
  result?: string;
  PTS?: string;
  REB?: string;
  AST?: string;
  [key: string]: string | undefined;
}

interface LeagueTableProps {
  recentGames?: Game[] | null;
}

type Group = { title: string; average?: Game; games: Game[] };

const LeagueTable: React.FC<LeagueTableProps> = ({ recentGames }) => {
  const [showModal, setShowModal] = useState(false);

  const safeGames: Game[] = Array.isArray(recentGames) ? recentGames : [];

  const groupByTitle = (list: Game[] = []): Group[] => {
    if (!Array.isArray(list) || list.length === 0) return [];
    const map = new Map<string, Group>();
    const order: string[] = [];

    for (const g of list) {
      if (!g || typeof g !== "object") continue;

      const key = (g.title && String(g.title)) || "Unknown";
      if (!map.has(key)) {
        map.set(key, { title: key, games: [] });
        order.push(key);
      }
      const group = map.get(key)!;

      const dateStr = (g.date ?? "").toString().trim().toLowerCase();
      const isAverage = dateStr === "average";

      if (isAverage) group.average = g;
      else group.games.push(g);
    }

    return order.map((k) => map.get(k)!);
  };

  const AverageRow: React.FC<{ avg?: Game; title: string }> = ({
    avg,
    title,
  }) => (
    <TableRow
      className="bg-[#2B2B2B] hover:bg-[#2B2B2B]"
      style={{ cursor: "default", borderRadius: 12 }}
    >
      <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px] font-semibold">
        Average
      </TableCell>
      <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px] font-semibold text-[#EBEBEB]">
        {title || "Unknown"}
      </TableCell>
      <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px] text-white" />
      <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px] font-semibold">
        {avg?.PTS ?? "-"}
      </TableCell>
      <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px] font-semibold">
        {avg?.REB ?? "-"}
      </TableCell>
      <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px] font-semibold">
        {avg?.AST ?? "-"}
      </TableCell>
    </TableRow>
  );

  const renderTable = (games: Game[] = [], limitGames?: number) => {
    const groups = groupByTitle(games);
    let remaining = typeof limitGames === "number" ? limitGames : Infinity;

    return (
      <Table
        className="w-full"
        style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
      >
        <TableHeader className="m-3 border-b border-[#484848]">
          <TableRow>
            {["Date", "Opponent", "Result", "PTS", "REB", "AST"].map(
              (title, i) => (
                <TableHead
                  key={i}
                  style={{
                    borderBottom: "1px solid var(--Border-primary, #484848)",
                    borderCollapse: "separate",
                  }}
                  className={cn(
                    "bg-[#282828] px-4 py-5 text-[14px] text-[#EBEBEB]",
                    i === 0 && "rounded-bl-[12px]",
                    i === 5 && "rounded-br-[12px]",
                  )}
                >
                  {title}
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Порожній стан */}
          {(!groups || groups.length === 0) && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="px-4 py-6 text-center text-[14px] text-[#BDBDBD]"
              >
                No games to display yet.
              </TableCell>
            </TableRow>
          )}

          {groups.map((group, gi) => {
            const total = group?.games?.length ?? 0;
            const toShow = Math.min(total, remaining);

            if (toShow <= 0) return null;
            remaining -= toShow;

            const chunk = (group.games || []).slice(0, toShow);

            return (
              <React.Fragment key={`${group.title || "Unknown"}-${gi}`}>
                <AverageRow
                  avg={group.average}
                  title={group.title || "Unknown"}
                />

                {chunk.map((game, index) => (
                  <TableRow
                    key={`${group.title || "Unknown"}-${index}-${game?.date ?? index}-${game?.opponent ?? ""}`}
                    className="transition-shadow duration-200"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderRadius = "12px";
                      e.currentTarget.style.boxShadow =
                        "inset 0px 5px 6px 0px #8F8F8F40, inset 0px -5px 6px 0px #8F8F8F40";
                      Array.from(e.currentTarget.children).forEach((cell) => {
                        (cell as HTMLElement).style.borderBottom = "0";
                      });
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderRadius = "0";
                      Array.from(e.currentTarget.children).forEach((cell) => {
                        (cell as HTMLElement).style.borderBottom =
                          "1px solid #484848";
                      });
                    }}
                  >
                    <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px]">
                      {game?.date ?? "-"}
                    </TableCell>
                    <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
                      {game?.opponent ?? "-"}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "border-b border-[#484848] px-4 py-5 text-[14px]",
                        (game?.result ?? "").startsWith("W") &&
                          "text-[#34D399]",
                        (game?.result ?? "").startsWith("L") &&
                          "text-[#DC2626]",
                        !(game?.result ?? "").startsWith("W") &&
                          !(game?.result ?? "").startsWith("L") &&
                          "text-white",
                      )}
                    >
                      {game?.result ?? "-"}
                    </TableCell>
                    <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
                      {game?.PTS ?? "-"}
                    </TableCell>
                    <TableCell className="border-b border-[#484848] px-4 py-5 text-[14px]">
                      {game?.REB ?? "-"}
                    </TableCell>
                    <TableCell className="!rounded-none border-b border-[#484848] px-4 py-5 text-[14px]">
                      {game?.AST ?? "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="w-full max-w-[766px]">
      <div className="bg-glass-gradient w-full overflow-hidden rounded-2xl p-3 backdrop-blur-[20px]">
        {renderTable(safeGames, 5)}
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
          {renderTable(safeGames)}
        </div>
      </LeagueModal>
    </div>
  );
};

export default LeagueTable;

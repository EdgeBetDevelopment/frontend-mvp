"use client";

import { cn } from "@/shared/utils/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table";

type NewStats = {
  PPG?: string | number;
  RPG?: string | number;
  APG?: string | number;
  SPG?: string | number;
  BPG?: string | number;
  "FG%"?: string | number;
  "FT%"?: string | number;
  "TS%"?: string | number;
  "3P%"?: string | number;
  MPG?: string | number;
  SEASON_ID?: string;
};

interface PlayerStatsTableProps {
  stats: NewStats;
}

const statOrder: { key: keyof NewStats; label: string }[] = [
  { key: "PPG", label: "PPG" },
  { key: "RPG", label: "RPG" },
  { key: "APG", label: "APG" },
  { key: "SPG", label: "SPG" },
  { key: "BPG", label: "BPG" },
  { key: "FG%", label: "FG%" },
  { key: "FT%", label: "FT%" },
  { key: "TS%", label: "TS%" },
  { key: "3P%", label: "3P%" },
  { key: "MPG", label: "MPG" },
];

export const PlayerStatsTable = ({ stats }: PlayerStatsTableProps) => {
  if (!stats) return null;

  const normalize = (v: string | number | undefined) => {
    if (v === undefined || v === null) return "-";
    const n = typeof v === "string" ? Number(v) : v;
    return Number.isFinite(n) ? n.toFixed(1) : String(v);
  };

  const seasonText = (() => {
    if (stats.SEASON_ID?.includes("-"))
      return stats.SEASON_ID.replace("-", " - ");
    const currentYear = new Date().getFullYear() - 1;
    return `${currentYear} - ${String(currentYear + 1).slice(2)}`;
  })();

  return (
    <div
      className="rounded-xl p-4 backdrop-blur-[20px] backdrop-saturate-150"
      style={{
        backgroundSize: "cover",
        background:
          "linear-gradient(109.21deg, rgba(23, 23, 23, 0.6) 20.66%, rgba(105, 105, 105, 0.316464) 61.53%, rgba(125, 125, 125, 0.06) 104.05%)",
      }}
    >
      <h3 className="mb-4 text-lg font-semibold text-white">
        {`Current Season Stats - (${seasonText})`}
      </h3>

      <div className="w-full overflow-x-auto">
        <Table style={{ borderCollapse: "separate", borderSpacing: "0" }}>
          <TableHeader>
            <TableRow>
              {statOrder.map((stat, i) => (
                <TableHead
                  key={stat.key as string}
                  style={{
                    borderBottom: "1px solid var(--Border-primary, #484848)",
                    borderCollapse: "separate",
                  }}
                  className={cn(
                    "whitespace-nowrap text-white",
                    i === 0 && "rounded-bl-[12px]",
                    i === statOrder.length - 1 && "rounded-br-[12px]",
                  )}
                >
                  {stat.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              {statOrder.map(({ key }) => {
                const raw = stats[key];
                return (
                  <TableCell key={key as string}>{normalize(raw)}</TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

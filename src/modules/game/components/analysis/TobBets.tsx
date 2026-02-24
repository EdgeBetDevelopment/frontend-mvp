import { useStore } from "@/store";
import { convertAmericanToDecimal, formatOddsWithSign } from "@/shared/utils";
import { IBet } from "@/types/game";

const TopBets = ({
  valueBets,
  conservativeBets,
}: {
  valueBets: IBet[];
  conservativeBets: IBet[];
}) => {
  const isAmerican = useStore((state) => state.isAmerican);

  const formatBetDisplay = (bet: IBet, isAmerican: boolean) => {
    const decimalOdds = convertAmericanToDecimal(bet.bet_coefficient).toFixed(
      2,
    );
    const displayedOdds = isAmerican
      ? formatOddsWithSign(bet.bet_coefficient, true)
      : decimalOdds;

    return {
      main: `${bet.bet_name} (${displayedOdds})`,
      team: bet.bet_team,
    };
  };

  return (
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <h3 className="align-bottom text-lg font-semibold tracking-normal">
          Top 3 Best Value Bets
        </h3>
        {valueBets?.slice(0, 3).map((bet: IBet, idx: number) => {
          const { main, team } = formatBetDisplay(bet, isAmerican);
          return (
            <div key={idx} className="mb-4">
              <div className="mb-2 rounded-lg bg-green-700 px-4 py-2 text-center text-base font-semibold text-white">
                {main}
              </div>
              {team && (
                <p className="whitespace-normal break-words text-center text-sm text-white/80">
                  {team}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mx-2 hidden w-px bg-white/20 md:block" />
      <div className="flex-1 space-y-4">
        <h3 className="align-bottom text-lg font-semibold tracking-normal">
          Top 3 Conservative Bets
        </h3>
        {conservativeBets?.slice(0, 3).map((bet: IBet, idx: number) => {
          const { main, team } = formatBetDisplay(bet, isAmerican);
          return (
            <div key={idx} className="mb-4">
              <div className="mb-2 rounded-lg bg-green-700 px-4 py-2 text-center text-base font-semibold text-white">
                {main}
              </div>
              {team && (
                <p className="whitespace-normal break-words text-center text-sm text-white/80">
                  {team}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopBets;

const TopBets = ({
  valueBets,
  conservativeBets,
}: {
  valueBets: string[];
  conservativeBets: string[];
}) => {
  const splitBetText = (text: string) => {
    const [before, after] = text.split(':');
    return {
      before: before?.trim() || text,
      after: after?.trim(),
    };
  };

  return (
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <h3 className="align-bottom text-lg font-semibold tracking-normal">
          Top 3 Best Value Bets
        </h3>
        {valueBets?.slice(0, 3).map((bet: string, idx: number) => {
          const { before, after } = splitBetText(bet);
          return (
            <div key={idx} className="mb-4">
              <div className="mb-2 rounded-lg bg-green-700 px-4 py-2 text-center text-base font-semibold text-white">
                {before}
              </div>
              {after && (
                <p className="text-center text-sm break-words whitespace-normal text-white/80">
                  {after}
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
        {conservativeBets?.slice(0, 3).map((bet: string, idx: number) => {
          const { before, after } = splitBetText(bet);
          return (
            <div key={idx} className="mb-4">
              <div className="mb-2 rounded-lg bg-green-700 px-4 py-2 text-center text-base font-semibold text-white">
                {before}
              </div>
              {after && (
                <p className="text-center text-sm break-words whitespace-normal text-white/80">
                  {after}
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

const TopBets = ({
  valueBets,
  conservativeBets,
}: {
  valueBets: string[];
  conservativeBets: string[];
}) => {
  return (
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <h3 className="align-bottom text-lg font-semibold tracking-normal">
          Top 3 Best Value Bets
        </h3>
        {valueBets?.map((bet: string, idx: number) => (
          <div key={idx} className="mb-4">
            <div className="mb-2 rounded-lg bg-green-700 px-4 py-2 text-center text-base font-semibold text-white">
              {bet}
            </div>
            {/* <p className="text-sm text-white/80">{bet.description}</p> */}
          </div>
        ))}
      </div>
      <div className="mx-2 hidden w-px bg-white/20 md:block" />
      <div className="flex-1 space-y-4">
        <h3 className="align-bottom text-lg font-semibold tracking-normal">
          Top 3 Conservative Bets
        </h3>
        {conservativeBets?.map((bet: string, idx: number) => (
          <div key={idx} className="mb-4">
            <div className="mb-2 rounded-lg bg-green-700 px-4 py-2 text-center text-base font-semibold text-white">
              {bet}
            </div>
            {/* <p className="text-sm text-white/80">{bet.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBets;

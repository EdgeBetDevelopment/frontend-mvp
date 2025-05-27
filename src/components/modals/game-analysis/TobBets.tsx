const TopBets = () => {
  const bestValueBets = [
    {
      label: 'Anthony Edwards Over 24.5 Points (-115)',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nunc amet facilisis tellus id. Pellentesque dui mattis id odio diam.',
    },
    {
      label: 'Julius Randle Over 3.5 Turnovers (-130)',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nunc amet facilisis tellus id. Pellentesque dui mattis id odio diam.',
    },
    {
      label: 'Under 217 Total Points (-110)',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nunc amet facilisis tellus id. Pellentesque dui mattis id odio diam.',
    },
  ];
  const conservativeBets = [
    {
      label: 'Anthony Edwards Over 22.5 Points (-140)',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nunc amet facilisis tellus id. Pellentesque dui mattis id odio diam.',
    },
    {
      label: 'Julius Randle Over 2.5 Turnovers (-160)',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nunc amet facilisis tellus id. Pellentesque dui mattis id odio diam.',
    },
    {
      label: 'Under 217 Total Points (-110)',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nunc amet facilisis tellus id. Pellentesque dui mattis id odio diam.',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <h3 className="align-bottom text-lg font-semibold tracking-normal">
          Top 3 Best Value Bets
        </h3>
        {bestValueBets.map((bet, idx) => (
          <div key={idx} className="mb-4">
            <div className="bg-primary-brand mb-2 rounded-lg px-4 py-2 text-center text-base font-semibold text-[#1A1A1A]">
              {bet.label}
            </div>
            <p className="text-sm text-white/80">{bet.description}</p>
          </div>
        ))}
      </div>
      <div className="mx-2 hidden w-px bg-white/20 md:block" />
      <div className="flex-1 space-y-4">
        <h3 className="align-bottom text-lg font-semibold tracking-normal">
          Top 3 Conservative Bets
        </h3>
        {conservativeBets.map((bet, idx) => (
          <div key={idx} className="mb-4">
            <div className="bg-primary-brand mb-2 rounded-lg px-4 py-2 text-center text-base font-semibold text-[#1A1A1A]">
              {bet.label}
            </div>
            <p className="text-sm text-white/80">{bet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBets;

export const nbaMarketTypeChoices = [
  { id: 'other', name: 'Other' },
  { id: 'moneyline', name: 'Moneyline' },
  { id: 'spread', name: 'Spread' },
  { id: 'total', name: 'Total (Game Total)' },
  { id: 'team_total', name: 'Team Total' },
  { id: 'win_margin', name: 'Win Margin' },
  { id: 'first_half_moneyline', name: 'First Half Moneyline' },
  { id: 'first_half_spread', name: 'First Half Spread' },
  { id: 'first_half_total', name: 'First Half Total' },
  { id: 'player_points_prop', name: 'Player Points Prop' },
  { id: 'player_rebounds_prop', name: 'Player Rebounds Prop' },
  { id: 'player_assists_prop', name: 'Player Assists Prop' },
];

export const confidenceLevelChoices = [
  { id: 'lock', name: 'Lock' },
  { id: 'high', name: 'High' },
  { id: 'medium', name: 'Medium' },
  { id: 'low', name: 'Low' },
];

export const confidenceLevelChoicesSimple = [
  { id: 'lock', name: 'Lock' },
  { id: 'high', name: 'High' },
  { id: 'medium', name: 'Medium' },
];

export const overUnderChoices = [
  { id: 'over', name: 'Over' },
  { id: 'under', name: 'Under' },
];

export const unitChoices = Array.from({ length: 5 }, (_, index) => {
  const value = index + 1;
  return { id: value, name: `${value} Unit${value > 1 ? 's' : ''}` };
});

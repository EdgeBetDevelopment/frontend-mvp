import { BetPick } from "@/modules/matchup/types";

export interface BetDescription {
  market_type: string;
  bet_name: string;
  bet_win_margin_min_value: number;
  bet_win_margin_max_value: number;
  bet_value: number;
  bet_over_under: string;
  bet_team: string;
  bet_player: string;
  bet_coefficient: number;
  bet_description: string;
}

export interface MappedPick {
  game_id: number;
  odds: number;
  selected_team_id: string;
  selected_team_name: string;
  description: BetDescription;
  sport: string;
}

export const mapPick = (bet: BetPick): MappedPick => {
  const description = bet.description || "";

  let marketType = bet.market_type || "";
  let betValue = bet.bet_value ?? 0;
  let betOverUnder = bet.bet_over_under || "";
  const betPlayer = bet.bet_player || "";

  if (!marketType) {
    const marketTypeMatch = description.match(/^(\w+)/);
    marketType = marketTypeMatch ? marketTypeMatch[1] : "";
  }

  if (betValue === 0 || betValue === null) {
    const valueMatch = description.match(/([+-]?\d+\.?\d*)/);
    betValue = valueMatch ? parseFloat(valueMatch[1]) : 0;
  }

  if (!betOverUnder) {
    const overUnderMatch = description.toLowerCase().match(/\b(over|under)\b/);
    betOverUnder = overUnderMatch ? overUnderMatch[1] : "";
  }

  const betName = description;

  return {
    game_id: bet.game_id,
    odds: bet.odds,
    selected_team_id: bet.selected_team_id || "",
    selected_team_name: bet.selected_team_name,
    description: {
      market_type: marketType,
      bet_name: betName,
      bet_win_margin_min_value: 0,
      bet_win_margin_max_value: 0,
      bet_value: betValue,
      bet_over_under: betOverUnder,
      bet_team: bet.selected_team_name,
      bet_player: betPlayer,
      bet_coefficient: bet.odds,
      bet_description: description,
    },
    sport: bet.sport,
  };
};

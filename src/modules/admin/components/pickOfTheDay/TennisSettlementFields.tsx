import { NumberInput, SelectInput, TextInput, required } from 'react-admin';

import { tennisMarketTypeChoices } from '../../constants';

const yesNoChoices = [
  { id: 'yes', name: 'Yes' },
  { id: 'no', name: 'No' },
];

const overUnderChoices = [
  { id: 'over', name: 'Over' },
  { id: 'under', name: 'Under' },
];

const oddEvenChoices = [
  { id: 'odd', name: 'Odd' },
  { id: 'even', name: 'Even' },
];

const homeAwayDrawChoices = [
  { id: 'home', name: 'Home (Player 1)' },
  { id: 'away', name: 'Away (Player 2)' },
  { id: 'draw', name: 'Draw' },
];

type Props = {
  marketType?: string;
  selectedGame: {
    first_player_name: string;
    second_player_name: string;
  } | null;
};

export const TennisSettlementFields = ({ marketType, selectedGame }: Props) => {
  if (!marketType) return null;

  const playerChoices = selectedGame
    ? [
        { id: selectedGame.first_player_name, name: selectedGame.first_player_name },
        { id: selectedGame.second_player_name, name: selectedGame.second_player_name },
      ]
    : [];

  const renderPlayerSelection = () =>
    playerChoices.length > 0 ? (
      <SelectInput
        source="settlement.selection"
        label="Player"
        choices={playerChoices}
        validate={required()}
      />
    ) : (
      <TextInput
        source="settlement.selection"
        label="Player Name"
        validate={required()}
        helperText="Select a game first to get player choices"
      />
    );

  // Player name markets
  if (
    marketType === 'match_winner' ||
    marketType === 'set_winner_1st' ||
    marketType === 'set_winner_2nd' ||
    marketType === 'set_winner_3rd'
  ) {
    return renderPlayerSelection();
  }

  // Set betting: "2:0" / "2:1" / "0:2" / "1:2"
  if (marketType === 'set_betting') {
    return (
      <SelectInput
        source="settlement.selection"
        label="Set Score"
        choices={[
          { id: '2:0', name: '2:0 (P1 wins 2-0)' },
          { id: '2:1', name: '2:1 (P1 wins 2-1)' },
          { id: '0:2', name: '0:2 (P2 wins 2-0)' },
          { id: '1:2', name: '1:2 (P2 wins 2-1)' },
        ]}
        validate={required()}
      />
    );
  }

  // Correct score — free text like "6:4"
  if (
    marketType === 'correct_score_1st_set' ||
    marketType === 'correct_score_2nd_set'
  ) {
    return (
      <TextInput
        source="settlement.selection"
        label='Score (e.g. "6:4")'
        validate={required()}
        helperText="Format: P1 games : P2 games"
      />
    );
  }

  // Over/Under with a line
  if (marketType === 'total_sets' || marketType.startsWith('player_total_')) {
    return (
      <>
        <SelectInput
          source="settlement.selection"
          label="Over / Under"
          choices={overUnderChoices}
          validate={required()}
        />
        <NumberInput
          source="settlement.line"
          label="Line (e.g. 2.5)"
          validate={required()}
        />
      </>
    );
  }

  // Number of sets
  if (marketType === 'number_of_sets') {
    return (
      <SelectInput
        source="settlement.selection"
        label="Number of Sets"
        choices={[
          { id: '2', name: '2 Sets' },
          { id: '3', name: '3 Sets' },
        ]}
        validate={required()}
      />
    );
  }

  // Odd/Even markets
  if (marketType.startsWith('odd_even')) {
    return (
      <SelectInput
        source="settlement.selection"
        label="Odd / Even"
        choices={oddEvenChoices}
        validate={required()}
      />
    );
  }

  // Yes/No markets
  if (
    marketType === 'tie_break' ||
    marketType === 'tie_break_1st_set' ||
    marketType.startsWith('straight_sets_') ||
    marketType.startsWith('win_at_least_one_set_') ||
    marketType.startsWith('win_from_behind_')
  ) {
    return (
      <SelectInput
        source="settlement.selection"
        label="Selection"
        choices={yesNoChoices}
        validate={required()}
      />
    );
  }

  // Home/Away/Draw markets
  if (marketType === 'aces_1x2' || marketType === 'double_faults_1x2') {
    return (
      <SelectInput
        source="settlement.selection"
        label="Selection"
        choices={homeAwayDrawChoices}
        validate={required()}
      />
    );
  }

  // Set/Match
  if (marketType === 'set_match') {
    return (
      <SelectInput
        source="settlement.selection"
        label="Set / Match"
        choices={[
          { id: '1/1', name: '1/1 (P1 wins set 1, P1 wins match)' },
          { id: '1/2', name: '1/2 (P1 wins set 1, P2 wins match)' },
          { id: '2/1', name: '2/1 (P2 wins set 1, P1 wins match)' },
          { id: '2/2', name: '2/2 (P2 wins set 1, P2 wins match)' },
        ]}
        validate={required()}
      />
    );
  }

  return null;
};

export { tennisMarketTypeChoices };

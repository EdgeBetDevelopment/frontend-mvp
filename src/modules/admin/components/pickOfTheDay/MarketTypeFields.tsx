import { NumberInput, SelectInput, TextInput, required } from 'react-admin';

import { overUnderChoices } from '../../constants';

type Props = {
  marketType?: string;
  isNBA: boolean;
  selectedGame: {
    home_team: string;
    away_team: string;
  } | null;
};

export const MarketTypeFields = ({
  marketType,
  isNBA,
  selectedGame,
}: Props) => {
  if (!isNBA || !marketType || marketType === 'other') {
    return null;
  }

  const renderTeamInput = (label: string) => {
    if (selectedGame) {
      return (
        <SelectInput
          source="settlement.bet_team"
          label={label}
          choices={[
            { id: selectedGame.home_team, name: selectedGame.home_team },
            { id: selectedGame.away_team, name: selectedGame.away_team },
          ]}
          validate={required()}
        />
      );
    }

    return (
      <TextInput
        source="settlement.bet_team"
        label={label}
        validate={required()}
      />
    );
  };

  if (marketType === 'moneyline') {
    return renderTeamInput('Team');
  }

  if (marketType === 'spread') {
    return (
      <>
        {renderTeamInput('Team')}
        <NumberInput
          source="settlement.bet_value"
          label="Spread Value"
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'total') {
    return (
      <>
        <NumberInput
          source="settlement.bet_value"
          label="Total Value"
          validate={required()}
        />
        <SelectInput
          source="settlement.bet_over_under"
          label="Over / Under"
          choices={overUnderChoices}
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'team_total') {
    return (
      <>
        {renderTeamInput('Team')}
        <NumberInput
          source="settlement.bet_value"
          label="Total Value"
          validate={required()}
        />
        <SelectInput
          source="settlement.bet_over_under"
          label="Over / Under"
          choices={overUnderChoices}
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'win_margin') {
    return (
      <>
        {renderTeamInput('Team')}
        <NumberInput
          source="settlement.bet_win_margin_min_value"
          label="Minimum Win Margin"
          validate={required()}
        />
        <NumberInput
          source="settlement.bet_win_margin_max_value"
          label="Maximum Win Margin"
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'first_half_moneyline') {
    return renderTeamInput('Team');
  }

  if (marketType === 'first_half_spread') {
    return (
      <>
        {renderTeamInput('Team')}
        <NumberInput
          source="settlement.bet_value"
          label="Spread Value"
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'first_half_total') {
    return (
      <>
        <NumberInput
          source="settlement.bet_value"
          label="Total Value"
          validate={required()}
        />
        <SelectInput
          source="settlement.bet_over_under"
          label="Over / Under"
          choices={overUnderChoices}
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'player_points_prop') {
    return (
      <>
        <TextInput
          source="settlement.bet_player"
          label="Player"
          validate={required()}
        />
        <NumberInput
          source="settlement.bet_value"
          label="Points Value"
          validate={required()}
        />
        <SelectInput
          source="settlement.bet_over_under"
          label="Over / Under"
          choices={overUnderChoices}
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'player_rebounds_prop') {
    return (
      <>
        <TextInput
          source="settlement.bet_player"
          label="Player"
          validate={required()}
        />
        <NumberInput
          source="settlement.bet_value"
          label="Rebounds Value"
          validate={required()}
        />
        <SelectInput
          source="settlement.bet_over_under"
          label="Over / Under"
          choices={overUnderChoices}
          validate={required()}
        />
      </>
    );
  }

  if (marketType === 'player_assists_prop') {
    return (
      <>
        <TextInput
          source="settlement.bet_player"
          label="Player"
          validate={required()}
        />
        <NumberInput
          source="settlement.bet_value"
          label="Assists Value"
          validate={required()}
        />
        <SelectInput
          source="settlement.bet_over_under"
          label="Over / Under"
          choices={overUnderChoices}
          validate={required()}
        />
      </>
    );
  }

  return null;
};

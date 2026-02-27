import { useEffect, useState } from 'react';
import {
  NumberInput,
  SelectInput,
  TextInput,
  required,
  AutocompleteInput,
} from 'react-admin';

import { overUnderChoices } from '../../constants';
import { gameService } from '@/modules/game';

type Props = {
  marketType?: string;
  isNBA: boolean;
  selectedGame: {
    id: number;
    home_team: string;
    away_team: string;
  } | null;
};

export const MarketTypeFields = ({
  marketType,
  isNBA,
  selectedGame,
}: Props) => {
  const [players, setPlayers] = useState<Array<{ id: string; name: string }>>(
    [],
  );
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!selectedGame?.id) {
        setPlayers([]);
        return;
      }

      const isPlayerMarketType =
        marketType === 'player_points_prop' ||
        marketType === 'player_rebounds_prop' ||
        marketType === 'player_assists_prop';

      if (!isPlayerMarketType) {
        setPlayers([]);
        return;
      }

      try {
        setIsLoadingPlayers(true);
        const data = await gameService.getGamePlayers(selectedGame.id);

        const allPlayers = [
          ...data.home_team.players,
          ...data.away_team.players,
        ];

        const playerChoices = allPlayers.map((player) => ({
          id: player,
          name: player,
        }));

        setPlayers(playerChoices);
      } catch (error) {
        console.error('Error fetching game players:', error);
        setPlayers([]);
      } finally {
        setIsLoadingPlayers(false);
      }
    };

    fetchPlayers();
  }, [selectedGame?.id, marketType]);

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
        <AutocompleteInput
          source="settlement.bet_player"
          label="Player"
          choices={players}
          validate={required()}
          filterToQuery={(searchText) => searchText}
          disabled={isLoadingPlayers || players.length === 0}
          helperText={
            isLoadingPlayers
              ? 'Loading players...'
              : players.length === 0
                ? 'Select a game first'
                : ''
          }
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
        <AutocompleteInput
          source="settlement.bet_player"
          label="Player"
          choices={players}
          validate={required()}
          filterToQuery={(searchText) => searchText}
          disabled={isLoadingPlayers || players.length === 0}
          helperText={
            isLoadingPlayers
              ? 'Loading players...'
              : players.length === 0
                ? 'Select a game first'
                : ''
          }
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
        <AutocompleteInput
          source="settlement.bet_player"
          label="Player"
          choices={players}
          validate={required()}
          filterToQuery={(searchText) => searchText}
          disabled={isLoadingPlayers || players.length === 0}
          helperText={
            isLoadingPlayers
              ? 'Loading players...'
              : players.length === 0
                ? 'Select a game first'
                : ''
          }
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

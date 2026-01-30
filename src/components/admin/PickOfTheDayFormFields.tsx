import { useEffect, useState } from 'react';
import {
  FormDataConsumer,
  NumberInput,
  required,
  SelectInput,
  TextInput,
  useRecordContext,
} from 'react-admin';

import apiService from '@/services';

export const PickOfTheDayFormFields = () => {
  const record = useRecordContext();
  const [gameChoices, setGameChoices] = useState<
    {
      id: number;
      name: string;
      home_team_id: number;
      away_team_id: number;
      home_team: string;
      away_team: string;
    }[]
  >([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const sportChoices = [
    { id: 'nba', name: 'NBA' },
    { id: 'other', name: 'Other' },
  ];

  const nbaMarketTypeChoices = [
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

  const otherMarketTypeChoices = [{ id: 'other', name: 'Other' }];

  const confidenceLevelChoices = [
    { id: 'lock', name: 'Lock' },
    { id: 'high', name: 'High' },
    { id: 'medium', name: 'Medium' },
    { id: 'low', name: 'Low' },
  ];

  const overUnderChoices = [
    { id: 'over', name: 'Over' },
    { id: 'under', name: 'Under' },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesResponse = await apiService.getGames();
        const items = Array.isArray(gamesResponse)
          ? gamesResponse
          : gamesResponse?.games || gamesResponse?.data || [];
        const games = items
          .map((item: any) => item?.game ?? item)
          .filter((game: any) => game?.id)
          .map((game: any) => {
            return {
              id: game.id,
              name: `${game.home_team} vs ${game.away_team} — ${new Date(game.start_time).toLocaleString()}`,
              home_team_id: game.home_team_id,
              away_team_id: game.away_team_id,
              home_team: game.home_team,
              away_team: game.away_team,
            };
          });
        setGameChoices(games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (!record?.game_id || gameChoices.length === 0) {
      return;
    }

    const foundGame = gameChoices.find((g) => g.id === record.game_id);
    if (foundGame) {
      setSelectedGame(foundGame);
    }
  }, [record?.game_id, gameChoices]);

  return (
    <>
      <SelectInput
        source="sport"
        label="Sport"
        choices={sportChoices}
        validate={required()}
      />
      <TextInput source="pick" label="Your pick" validate={required()} />

      <FormDataConsumer>
        {({ formData }) =>
          formData?.sport === 'nba' ? (
            <SelectInput
              source="game_id"
              label="Game"
              choices={gameChoices}
              validate={required()}
              onChange={(e) => {
                const selectedId = parseInt(e.target.value, 10);
                const foundGame = gameChoices.find((g) => g.id === selectedId);
                setSelectedGame(foundGame || null);
              }}
            />
          ) : (
            <NumberInput source="game_id" label="Game" validate={required()} />
          )
        }
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) => (
          <SelectInput
            source="settlement.market_type"
            label="Market Type"
            choices={
              formData?.sport === 'nba'
                ? nbaMarketTypeChoices
                : otherMarketTypeChoices
            }
            validate={required()}
          />
        )}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) => {
          const marketType = formData?.settlement?.market_type;
          const isNBA = formData?.sport === 'nba';

          const renderTeamInput = (label: string) => {
            if (isNBA && selectedGame) {
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

          if (marketType === 'other' || !marketType) {
            return null;
          }

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
        }}
      </FormDataConsumer>

      <NumberInput source="odds" label="Odds" validate={required()} />
      <SelectInput
        source="confidence_level"
        label="Confidence Level"
        choices={confidenceLevelChoices}
        validate={required()}
      />
      <NumberInput source="units" label="Units" validate={required()} />
      <TextInput source="analysis" multiline validate={required()} />
    </>
  );
};

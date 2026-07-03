import { useEffect, useState } from 'react';
import {
  DateTimeInput,
  FormDataConsumer,
  NumberInput,
  required,
  SelectInput,
  TextInput,
  useRecordContext,
  useInput,
} from 'react-admin';

import { gameService } from '@/modules/game';
import { picksApi } from '@/modules/picks';
import { tennisApiService } from '@/modules/matchup/services/tennis.api';
import {
  confidenceLevelChoices,
  confidenceLevelChoicesSimple,
  nbaMarketTypeChoices,
  tennisMarketTypeChoices,
} from '@/modules/admin/constants';
import { unitChoices } from '@/modules/admin/utils';
import { convertUTCToLocalWithAmPm } from '@/shared/utils';
import { MarketTypeFields } from './MarketTypeFields';
import { TennisSettlementFields } from './TennisSettlementFields';

const validateOdds = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return 'Required';
  }
  const normalized = String(value).trim();
  if (normalized === '+' || normalized === '-') {
    return 'Enter valid odds';
  }
  if (!/^[+-]?\d+(\.\d+)?$/.test(normalized)) {
    return 'Enter valid odds';
  }
  return undefined;
};

const parseOdds = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  const normalized = String(value).trim();
  if (normalized === '+' || normalized === '-') {
    return normalized;
  }
  if (normalized.startsWith('-') || normalized.startsWith('+')) {
    return normalized;
  }
  const num = Number(normalized);
  if (!Number.isNaN(num)) {
    return `+${normalized}`;
  }
  return normalized;
};

const formatOdds = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  const str = String(value);
  if (str === '+' || str === '-') {
    return str;
  }

  if (str.startsWith('-') || str.startsWith('+')) {
    return str;
  }
  const num = Number(str);
  if (!Number.isNaN(num)) {
    return `+${str}`;
  }
  return str;
};

const toLocalDateTimeValue = (value?: string) => {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
};

const NonNbaDefaults = () => {
  const record = useRecordContext();
  const {
    field: { value: gameNameValue, onChange: onGameNameChange },
  } = useInput({ source: 'game_name' });
  const {
    field: { value: startTimeValue, onChange: onStartTimeChange },
  } = useInput({ source: 'start_time' });

  useEffect(() => {
    if (!gameNameValue && record?.game?.name) {
      onGameNameChange(record.game.name);
    }
  }, [gameNameValue, onGameNameChange, record?.game?.name]);

  useEffect(() => {
    if (!startTimeValue && record?.game?.start_time) {
      onStartTimeChange(toLocalDateTimeValue(record.game.start_time));
    }
  }, [startTimeValue, onStartTimeChange, record?.game?.start_time]);

  return null;
};

export const PickOfTheDayFormFields = () => {
  const record = useRecordContext();

  // NBA game state
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

  // Tennis game state
  const [tennisGameChoices, setTennisGameChoices] = useState<
    {
      id: number;
      name: string;
      first_player_name: string;
      second_player_name: string;
    }[]
  >([]);
  const [selectedTennisGame, setSelectedTennisGame] = useState<{
    id: number;
    first_player_name: string;
    second_player_name: string;
  } | null>(null);

  const [sportChoices, setSportChoices] = useState<
    { id: string; name: string }[]
  >([]);

  // Fetch NBA games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesResponse: any = await gameService.getGames();
        const items = Array.isArray(gamesResponse)
          ? gamesResponse
          : gamesResponse?.games || gamesResponse?.data || [];
        let games = items
          .map((item: any) => item?.game ?? item)
          .filter((game: any) => game?.id)
          .map((game: any) => {
            return {
              id: game.id,
              name: `${game.home_team} vs ${game.away_team} — ${convertUTCToLocalWithAmPm(game.start_time)}`,
              home_team_id: game.home_team_id,
              away_team_id: game.away_team_id,
              home_team: game.home_team,
              away_team: game.away_team,
            };
          });

        // Add the record's game if it's not in the list (e.g. finished NBA games)
        if (record?.game && record?.game_id && !record?.game?.first_player_name) {
          const gameExists = games.some((g: any) => g.id === record.game_id);
          if (!gameExists && record.game.id) {
            const recordGame = record.game;
            games = [
              {
                id: recordGame.id,
                name: `${recordGame.home_team} vs ${recordGame.away_team} — ${convertUTCToLocalWithAmPm(recordGame.start_time)}`,
                home_team_id: recordGame.home_team_id,
                away_team_id: recordGame.away_team_id,
                home_team: recordGame.home_team,
                away_team: recordGame.away_team,
              },
              ...games,
            ];
          }
        }

        setGameChoices(games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch tennis games
  useEffect(() => {
    const fetchTennisGames = async () => {
      try {
        const games = await tennisApiService.getTennisGames();
        let choices = games.map((game) => ({
          id: game.id,
          name: `${game.player1.full_name} vs ${game.player2.full_name} — ${convertUTCToLocalWithAmPm(game.start_time)}`,
          first_player_name: game.player1.full_name,
          second_player_name: game.player2.full_name,
        }));

        // Add the record's tennis game if not in the list (e.g. finished match)
        if (record?.game?.first_player_name && record?.game_id) {
          const exists = choices.some((g) => g.id === record.game_id);
          if (!exists) {
            choices = [
              {
                id: record.game.id,
                name: `${record.game.first_player_name} vs ${record.game.second_player_name} — ${convertUTCToLocalWithAmPm(record.game.start_time)}`,
                first_player_name: record.game.first_player_name,
                second_player_name: record.game.second_player_name,
              },
              ...choices,
            ];
          }
        }

        setTennisGameChoices(choices);
      } catch (error) {
        console.error('Error fetching tennis games:', error);
      }
    };

    fetchTennisGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch sports
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports: any = await picksApi.getPickOfTheDaySports();
        const choices = (Array.isArray(sports) ? sports : ['nba']).map(
          (sport) => ({
            id: sport,
            name: String(sport).toUpperCase(),
          }),
        );
        const recordSport = record?.sport;
        const withRecord = recordSport
          ? choices.some((choice) => choice.id === recordSport)
            ? choices
            : [
                ...choices,
                { id: recordSport, name: String(recordSport).toUpperCase() },
              ]
          : choices;
        setSportChoices(
          withRecord.length ? withRecord : [{ id: 'nba', name: 'NBA' }],
        );
      } catch (error) {
        console.error('Error fetching sports:', error);
        if (record?.sport) {
          setSportChoices([
            { id: record.sport, name: String(record.sport).toUpperCase() },
          ]);
        } else {
          setSportChoices([{ id: 'nba', name: 'NBA' }]);
        }
      }
    };

    fetchSports();
  }, [record?.sport]);

  // Restore NBA selected game from record
  useEffect(() => {
    if (!record?.game_id || gameChoices.length === 0) {
      return;
    }

    const foundGame = gameChoices.find((g) => g.id === record.game_id);
    if (foundGame) {
      setSelectedGame(foundGame);
    }
  }, [record?.game_id, gameChoices]);

  // Restore tennis selected game from record
  useEffect(() => {
    if (!record?.game_id || tennisGameChoices.length === 0) {
      return;
    }

    const foundGame = tennisGameChoices.find((g) => g.id === record.game_id);
    if (foundGame) {
      setSelectedTennisGame(foundGame);
    }
  }, [record?.game_id, tennisGameChoices]);

  return (
    <>
      <SelectInput
        source="sport"
        label="Sport"
        choices={sportChoices}
        validate={required()}
      />
      <FormDataConsumer>
        {({ formData }) => {
          const sport = String(formData?.sport || '').toLowerCase();
          const isNBA = sport === 'nba';
          return isNBA ? (
            <TextInput source="pick" label="Pick" validate={required()} />
          ) : (
            <TextInput source="pick" label="Your Pick" validate={required()} />
          );
        }}
      </FormDataConsumer>

      {/* Game selector */}
      <FormDataConsumer>
        {({ formData }) => {
          const sport = String(formData?.sport || '').toLowerCase();
          const isNBA = sport === 'nba';
          const isTennis = sport === 'tennis';

          if (isNBA) {
            return (
              <SelectInput
                source="game_id"
                label="Game"
                choices={gameChoices}
                validate={required()}
                parse={(value) => (value ? parseInt(value, 10) : undefined)}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value, 10);
                  const foundGame = gameChoices.find((g) => g.id === selectedId);
                  setSelectedGame(foundGame || null);
                }}
              />
            );
          }

          if (isTennis) {
            return (
              <SelectInput
                source="game_id"
                label="Match"
                choices={tennisGameChoices}
                validate={required()}
                parse={(value) => (value ? parseInt(value, 10) : undefined)}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value, 10);
                  const foundGame = tennisGameChoices.find((g) => g.id === selectedId);
                  setSelectedTennisGame(foundGame || null);
                }}
              />
            );
          }

          return (
            <TextInput source="game_name" label="Game" validate={required()} />
          );
        }}
      </FormDataConsumer>

      {/* Settlement / Market type */}
      <FormDataConsumer>
        {({ formData }) => {
          const sport = String(formData?.sport || '').toLowerCase();
          const isNBA = sport === 'nba';
          const isTennis = sport === 'tennis';

          if (isNBA) {
            return (
              <SelectInput
                source="settlement.market_type"
                label="Market Type"
                choices={nbaMarketTypeChoices}
                validate={required()}
              />
            );
          }

          if (isTennis) {
            return (
              <SelectInput
                source="settlement.market_type"
                label="Market Type"
                choices={tennisMarketTypeChoices}
                validate={required()}
              />
            );
          }

          return null;
        }}
      </FormDataConsumer>

      {/* Market-type-specific fields */}
      <FormDataConsumer>
        {({ formData }) => {
          const sport = String(formData?.sport || '').toLowerCase();
          const marketType = formData?.settlement?.market_type;

          if (sport === 'nba') {
            return (
              <MarketTypeFields
                marketType={marketType}
                isNBA
                selectedGame={selectedGame}
              />
            );
          }

          if (sport === 'tennis') {
            return (
              <TennisSettlementFields
                marketType={marketType}
                selectedGame={selectedTennisGame}
              />
            );
          }

          return null;
        }}
      </FormDataConsumer>

      {/* Non-NBA/Tennis: start time */}
      <FormDataConsumer>
        {({ formData }) => {
          const sport = String(formData?.sport || '').toLowerCase();
          const isNBA = sport === 'nba';
          const isTennis = sport === 'tennis';
          if (isNBA || isTennis) return null;
          const now = new Date();
          const localMin = new Date(
            now.getTime() - now.getTimezoneOffset() * 60000,
          )
            .toISOString()
            .slice(0, 16);
          return (
            <>
              <NonNbaDefaults />
              <DateTimeInput
                source="start_time"
                label="Start Time"
                validate={required()}
                inputProps={{ min: localMin }}
              />
            </>
          );
        }}
      </FormDataConsumer>

      <TextInput
        source="odds"
        label="Odds"
        type="text"
        validate={[required(), validateOdds]}
        parse={parseOdds}
        format={formatOdds}
      />
      <FormDataConsumer>
        {({ formData }) => {
          const isNBA = String(formData?.sport || '').toLowerCase() === 'nba';
          return (
            <SelectInput
              source="confidence_level"
              label="Confidence Level"
              choices={
                isNBA ? confidenceLevelChoices : confidenceLevelChoicesSimple
              }
              validate={required()}
            />
          );
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) => {
          const isNBA = String(formData?.sport || '').toLowerCase() === 'nba';
          return isNBA ? (
            <NumberInput source="units" label="Units" validate={required()} />
          ) : (
            <SelectInput
              source="units"
              label="Units"
              choices={unitChoices}
              validate={required()}
            />
          );
        }}
      </FormDataConsumer>
      <TextInput source="analysis" multiline validate={required()} />
    </>
  );
};

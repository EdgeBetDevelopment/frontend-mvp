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

import apiService from '@/services';

import {
  confidenceLevelChoices,
  confidenceLevelChoicesSimple,
  nbaMarketTypeChoices,
  unitChoices,
} from './pick-of-the-day/choices';
import { MarketTypeFields } from './pick-of-the-day/MarketTypeFields';

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
    return null;
  }
  const normalized = String(value).trim();
  if (normalized === '+' || normalized === '-') {
    return normalized;
  }
  const num = Number(normalized);
  return Number.isNaN(num) ? normalized : num;
};

const formatOdds = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  if (value === '+' || value === '-') {
    return String(value);
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    return String(value);
  }
  return num > 0 ? `+${num}` : String(num);
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
  const [sportChoices, setSportChoices] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesResponse: any = await apiService.getGames();
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
    const fetchSports = async () => {
      try {
        const sports: any = await apiService.getPickOfTheDaySports();
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
            : [...choices, { id: recordSport, name: String(recordSport).toUpperCase() }]
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
      <FormDataConsumer>
        {({ formData }) => {
          const isNBA =
            String(formData?.sport || '').toLowerCase() === 'nba';
          return isNBA ? (
            <TextInput source="pick" label="Pick" validate={required()} />
          ) : (
            <TextInput source="pick" label="Your Pick" validate={required()} />
          );
        }}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) => {
          const isNBA =
            String(formData?.sport || '').toLowerCase() === 'nba';
          return isNBA ? (
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
            <TextInput
              source="game_name"
              label="Game"
              validate={required()}
            />
          );
        }}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) => {
          const isNBA =
            String(formData?.sport || '').toLowerCase() === 'nba';
          return isNBA ? (
            <SelectInput
              source="settlement.market_type"
              label="Market Type"
              choices={nbaMarketTypeChoices}
              validate={required()}
            />
          ) : null;
        }}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) => {
          const marketType = formData?.settlement?.market_type;
          const isNBA =
            String(formData?.sport || '').toLowerCase() === 'nba';
          return (
            <MarketTypeFields
              marketType={marketType}
              isNBA={isNBA}
              selectedGame={selectedGame}
            />
          );
        }}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) => {
          const isNBA =
            String(formData?.sport || '').toLowerCase() === 'nba';
          const now = new Date();
          const localMin = new Date(
            now.getTime() - now.getTimezoneOffset() * 60000,
          )
            .toISOString()
            .slice(0, 16);
          return isNBA ? null : (
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
        validate={validateOdds}
        parse={parseOdds}
        format={formatOdds}
        inputProps={{ inputMode: 'decimal', pattern: '[+-]?\\d*(\\.\\d+)?' }}
      />
      <FormDataConsumer>
        {({ formData }) => {
          const isNBA =
            String(formData?.sport || '').toLowerCase() === 'nba';
          return (
            <SelectInput
              source="confidence_level"
              label="Confidence Level"
              choices={isNBA ? confidenceLevelChoices : confidenceLevelChoicesSimple}
              validate={required()}
            />
          );
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) => {
          const isNBA =
            String(formData?.sport || '').toLowerCase() === 'nba';
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

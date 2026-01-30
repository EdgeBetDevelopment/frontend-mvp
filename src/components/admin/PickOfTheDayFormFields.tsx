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

import {
  confidenceLevelChoices,
  confidenceLevelChoicesSimple,
  nbaMarketTypeChoices,
  unitChoices,
} from './pick-of-the-day/choices';
import { MarketTypeFields } from './pick-of-the-day/MarketTypeFields';

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
        setSportChoices(choices.length ? choices : [{ id: 'nba', name: 'NBA' }]);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setSportChoices([{ id: 'nba', name: 'NBA' }]);
      }
    };

    fetchSports();
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
      <FormDataConsumer>
        {({ formData }) =>
          formData?.sport === 'nba' ? (
            <TextInput source="pick" label="Pick" validate={required()} />
          ) : (
            <TextInput source="pick" label="Your Pick" validate={required()} />
          )
        }
      </FormDataConsumer>

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
            <TextInput source="game_id" label="Game" validate={required()} />
          )
        }
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) =>
          formData?.sport === 'nba' ? (
            <SelectInput
              source="settlement.market_type"
              label="Market Type"
              choices={nbaMarketTypeChoices}
              validate={required()}
            />
          ) : null
        }
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData }) => {
          const marketType = formData?.settlement?.market_type;
          const isNBA = formData?.sport === 'nba';
          return (
            <MarketTypeFields
              marketType={marketType}
              isNBA={isNBA}
              selectedGame={selectedGame}
            />
          );
        }}
      </FormDataConsumer>

      <NumberInput source="odds" label="Odds" validate={required()} />
      <FormDataConsumer>
        {({ formData }) => (
          <SelectInput
            source="confidence_level"
            label="Confidence Level"
            choices={
              formData?.sport === 'nba'
                ? confidenceLevelChoices
                : confidenceLevelChoicesSimple
            }
            validate={required()}
          />
        )}
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData }) =>
          formData?.sport === 'nba' ? (
            <NumberInput source="units" label="Units" validate={required()} />
          ) : (
            <SelectInput
              source="units"
              label="Units"
              choices={unitChoices}
              validate={required()}
            />
          )
        }
      </FormDataConsumer>
      <TextInput source="analysis" multiline validate={required()} />
    </>
  );
};

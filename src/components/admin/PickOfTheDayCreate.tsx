import { useEffect, useState } from 'react';
import {
  BooleanInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
} from 'react-admin';
import { useInput } from 'react-admin';

import apiService from '@/services';

const HiddenInput = ({ source, value }: { source: string; value: any }) => {
  const {
    field: { onChange },
  } = useInput({ source });

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return null;
};

export const PickOfTheDayCreate = () => {
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

  const notify = useNotify();
  const redirect = useRedirect();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesResponse = await apiService.getGames();
        const games = gamesResponse.map((item: any) => {
          const game = item.game;
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

  return (
    <Create
      mutationOptions={{
        onSuccess: () => {
          notify('Pick of the Day created successfully');
          redirect('/pick_of_the_day');
        },
        onError: () => {
          notify('Failed to create Pick of the Day', { type: 'error' });
        },
      }}
    >
      <SimpleForm>
        <SelectInput
          source="game_id"
          label="Select Game"
          choices={gameChoices}
          validate={required()}
          onChange={(e) => {
            const selectedId = parseInt(e.target.value, 10);
            const foundGame = gameChoices.find((g) => g.id === selectedId);
            setSelectedGame(foundGame || null);
          }}
        />
        <NumberInput source="win_probability_home" validate={required()} />
        <NumberInput source="win_probability_away" validate={required()} />
        <NumberInput source="odds_home" validate={required()} />
        <NumberInput source="odds_away" validate={required()} />
        {selectedGame && (
          <>
            <HiddenInput
              source="home_team_id"
              value={selectedGame.home_team_id}
            />
            <HiddenInput
              source="away_team_id"
              value={selectedGame.away_team_id}
            />
          </>
        )}
        {selectedGame && (
          <>
            <SelectInput
              source="predicted_winner"
              label="Predicted Winner"
              choices={[
                { id: selectedGame.home_team, name: selectedGame.home_team },
                { id: selectedGame.away_team, name: selectedGame.away_team },
              ]}
              validate={required()}
            />
            <SelectInput
              source="favorite_team"
              label="Favorite Team"
              choices={[
                { id: selectedGame.home_team, name: selectedGame.home_team },
                { id: selectedGame.away_team, name: selectedGame.away_team },
              ]}
              validate={required()}
            />
          </>
        )}
        <TextInput source="analysis" multiline validate={required()} />
        <BooleanInput source="is_premium" label="Is Premium?" />
      </SimpleForm>
    </Create>
  );
};

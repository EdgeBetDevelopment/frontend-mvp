import { DateField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const PickOfTheDay = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="user_id" />
      <TextField source="game_prediction.game.home_team" label="Home Team" />
      <TextField source="game_prediction.game.away_team" label="Away Team" />
      <TextField source="game_prediction.odds_home" label="Odds Home Team" />
      <TextField source="game_prediction.odds_away" label="Odds Away Team" />
      <TextField
        source="game_prediction.win_probability_home"
        label="Win probability home"
      />
      <TextField
        source="game_prediction.win_probability_away"
        label="Win probability away"
      />
      <TextField source="game_prediction.favorite_team" label="Favorite Team" />
      <TextField
        source="game_prediction.predicted_winner"
        label="Predicted winner"
      />
      <TextField source="game_prediction.analysis" label="Analys" />
      <DateField source="updated_at" />
    </SimpleShowLayout>
  </Show>
);

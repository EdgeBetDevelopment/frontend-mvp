import {
  BooleanField,
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from 'react-admin';

const FieldIf = ({
  source,
  label,
  type = 'text',
}: {
  source: string;
  label?: string;
  type?: 'text' | 'date' | 'bool';
}) => {
  const record = useRecordContext();
  const value = source
    .split('.')
    .reduce((acc: any, key) => (acc ? acc[key] : undefined), record);

  const isEmptyString =
    typeof value === 'string' && value.trim().length === 0;
  const isNullString =
    typeof value === 'string' &&
    (value.trim().toLowerCase() === 'null' ||
      value.trim().toLowerCase() === 'undefined');

  if (value === undefined || value === null || isEmptyString || isNullString) {
    return null;
  }

  if (type === 'date') {
    return <DateField source={source} label={label} showTime />;
  }

  if (type === 'bool') {
    return <BooleanField source={source} label={label} />;
  }

  return <TextField source={source} label={label} />;
};

export const PickOfTheDay = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <FieldIf source="id" label="ID" />
      <FieldIf source="user_id" label="User" />
      <FieldIf source="game_id" label="Game ID" />
      <FieldIf source="sport" label="Sport" />
      <FieldIf source="pick" label="Pick" />
      <FieldIf source="odds" label="Odds" />
      <FieldIf source="confidence_level" label="Confidence Level" />
      <FieldIf source="units" label="Units" />
      <FieldIf source="analysis" label="Analysis" />

      <FieldIf source="game.id" label="Game ID" />
      <FieldIf source="game.nba_game_id" label="NBA Game ID" />
      <FieldIf source="game.home_team" label="Home Team" />
      <FieldIf source="game.away_team" label="Away Team" />
      <FieldIf source="game.start_time" label="Start Time" type="date" />
      <FieldIf source="game.status" label="Game Status" />
      <FieldIf source="game.final_score" label="Final Score" />

      <FieldIf source="settlement.market_type" label="Market Type" />
      <FieldIf
        source="settlement.bet_win_margin_min_value"
        label="Min Win Margin"
      />
      <FieldIf
        source="settlement.bet_win_margin_max_value"
        label="Max Win Margin"
      />
      <FieldIf source="settlement.bet_value" label="Bet Value" />
      <FieldIf source="settlement.bet_over_under" label="Over / Under" />
      <FieldIf source="settlement.bet_team" label="Team" />
      <FieldIf source="settlement.bet_player" label="Player" />

      <FieldIf source="status" label="Result" />
      <FieldIf source="is_premium" label="Premium" type="bool" />
      <FieldIf source="created_at" label="Created At" type="date" />
      <FieldIf source="updated_at" label="Updated At" type="date" />
    </SimpleShowLayout>
  </Show>
);

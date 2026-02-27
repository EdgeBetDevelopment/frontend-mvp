import React from 'react';
import {
  ArrayField,
  Datagrid,
  DeleteButton,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

const BetRow = ({ record }: any) => (
  <Datagrid>
    <TextField source="id" label="Bet ID" />
    <TextField source="amount" label="Amount" />
    <TextField source="selected_team_name" label="Team" />
    <TextField source="odds_at_bet_time" label="Odds" />
    <TextField source="status" label="Status" />
    <TextField source="nba_game_id" label="NBA Game ID" />
  </Datagrid>
);

export const UserWithBets = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="username" label="Username" />
      <TextField source="email" label="Email" />
      <TextField source="phone_number" label="Phone Number" />
      <TextField source="is_active" label="Active" />
      <TextField source="is_admin" label="Admin Status" />
      <DeleteButton redirect="list" />
      <ArrayField label="Bets" source="bets">
        <BetRow />
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

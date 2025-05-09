import { Datagrid, DateField, List, NumberField, TextField } from 'react-admin';

export const PickOfTheDayList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <NumberField source="recommended_bet" />
      <NumberField source="best_value" />
      <NumberField source="safer_bet" />
      <TextField source="prediction" />
      <TextField source="favorite_team" />
      <TextField source="predicted_winner" />
      <TextField source="user_id" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

import { Datagrid, List, NumberField, TextField } from 'react-admin';

export const UserWithBetsList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <NumberField source="totalBets" />
    </Datagrid>
  </List>
);

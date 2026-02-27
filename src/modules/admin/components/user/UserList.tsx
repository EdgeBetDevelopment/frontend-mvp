import { Datagrid, List, NumberField, TextField } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="username" />
      <NumberField source="phone_number" />
      <TextField source="email" />
    </Datagrid>
  </List>
);

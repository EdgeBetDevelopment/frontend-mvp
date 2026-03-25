import { Datagrid, List, TextField } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="phone_number" />
      <TextField source="email" />
    </Datagrid>
  </List>
);

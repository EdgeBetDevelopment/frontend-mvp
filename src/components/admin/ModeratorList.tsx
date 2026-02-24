import {
  BooleanField,
  Datagrid,
  EditButton,
  List,
  TextField,
} from 'react-admin';

export const ModeratorList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="email" label="Email" />
      <TextField source="username" label="Username" />
      <BooleanField source="is_active" label="Active" />
      <BooleanField source="is_admin" label="Admin" />
      <BooleanField source="is_super_admin" label="Super Admin" />
      <EditButton />
    </Datagrid>
  </List>
);

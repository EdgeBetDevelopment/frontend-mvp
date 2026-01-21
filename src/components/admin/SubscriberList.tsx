import {
  BooleanField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  TextField,
} from 'react-admin';

export const SubscriberList = () => (
  <List>
    <Datagrid bulkActionButtons={false} rowClick={false}>
      <TextField source="id" />
      <TextField source="email" />
      <BooleanField source="is_active" label="Active" />
      <DateField source="created_at" showTime />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

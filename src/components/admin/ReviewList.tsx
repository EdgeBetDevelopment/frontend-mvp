import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  TextField,
} from 'react-admin';

export const ReviewList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="text" />
      <NumberField source="rating" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

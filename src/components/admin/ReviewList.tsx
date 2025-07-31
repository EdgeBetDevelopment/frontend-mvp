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
    <Datagrid>
      <TextField source="id" />
      <TextField source="text" />
      <NumberField source="rating" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

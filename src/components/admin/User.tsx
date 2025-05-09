import {
  DeleteButton,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

export const User = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <NumberField source="phone_number" />
      <TextField source="email" />
      <DeleteButton redirect="list" />
    </SimpleShowLayout>
  </Show>
);

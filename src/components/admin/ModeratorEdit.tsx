import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';

export const ModeratorEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="email" disabled />
      <TextInput source="username" disabled />
      <BooleanInput source="is_admin" label="Is Admin" />
      <BooleanInput source="is_super_admin" label="Is Super Admin" />
    </SimpleForm>
  </Edit>
);

import { Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const ReviewEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="text" />
      <NumberInput source="rating" />
    </SimpleForm>
  </Edit>
);

import { Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const ReviewEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="text" />
      <NumberInput source="rating" />
    </SimpleForm>
  </Edit>
);

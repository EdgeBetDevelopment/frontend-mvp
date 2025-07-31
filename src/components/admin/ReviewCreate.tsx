import { Create, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const ReviewCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="text" />
      <NumberInput source="rating" />
    </SimpleForm>
  </Create>
);

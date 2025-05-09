import {
  Create,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const PickOfTheDayCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="recommended_bet" validate={required()} />
      <NumberInput source="best_value" validate={required()} />
      <NumberInput source="safer_bet" validate={required()} />
      <TextInput source="prediction" validate={required()} />
      <TextInput source="favorite_team" validate={required()} />
      <TextInput source="predicted_winner" validate={required()} />
    </SimpleForm>
  </Create>
);

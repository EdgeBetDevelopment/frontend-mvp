import {
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  required,
  email,
} from 'react-admin';

export const SubscriberEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="email" validate={[required(), email()]} fullWidth />
      <BooleanInput source="is_active" label="Active" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

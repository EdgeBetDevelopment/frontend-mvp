import {
  BooleanInput,
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
} from 'react-admin';

export const SubscriberCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="email" validate={[required(), email()]} fullWidth />
      <BooleanInput source="is_active" label="Active" defaultValue={true} />
    </SimpleForm>
  </Create>
);

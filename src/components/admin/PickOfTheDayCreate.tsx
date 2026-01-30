import {
  BooleanInput,
  Create,
  SimpleForm,
  useNotify,
  useRedirect,
} from 'react-admin';

import { PickOfTheDayFormFields } from './PickOfTheDayFormFields';
import { sanitizePickOfTheDayPayload } from './pickOfTheDayPayload';

export const PickOfTheDayCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  return (
    <Create
      mutationOptions={{
        onSuccess: () => {
          notify('Pick of the Day created successfully');
          redirect('/pick_of_the_day');
        },
        onError: () => {
          notify('Failed to create Pick of the Day', { type: 'error' });
        },
      }}
      transform={(data) => sanitizePickOfTheDayPayload(data)}
    >
      <SimpleForm>
        <PickOfTheDayFormFields />
        <BooleanInput source="is_premium" label="Is Premium?" />
      </SimpleForm>
    </Create>
  );
};

import {
  BooleanInput,
  Edit,
  SimpleForm,
  useNotify,
  useRedirect,
} from 'react-admin';

import { PickOfTheDayFormFields } from './PickOfTheDayFormFields';
import {
  diffPickOfTheDay,
  sanitizePickOfTheDayPayload,
} from './pickOfTheDayPayload';

export const PickOfTheDayEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  return (
    <Edit
      mutationMode="pessimistic"
      mutationOptions={{
        onSuccess: () => {
          notify('Pick of the Day updated successfully');
          redirect('/pick_of_the_day');
        },
        onError: (error) => {
          console.error('Update error:', error);
          notify('Failed to update Pick of the Day', { type: 'error' });
        },
      }}
      transform={(data, { previousData }) => {
        console.log('Transform - full data:', data);
        console.log('Transform - previousData:', previousData);
        const sanitized = sanitizePickOfTheDayPayload(data);
        console.log('Transform - sanitized payload:', sanitized);

        return sanitized;
      }}
    >
      <SimpleForm>
        <PickOfTheDayFormFields />
        <BooleanInput source="is_premium" label="Is Premium?" />
      </SimpleForm>
    </Edit>
  );
};

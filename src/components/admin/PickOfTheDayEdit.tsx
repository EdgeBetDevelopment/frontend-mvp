import { BooleanInput, Edit, SimpleForm, useNotify, useRedirect } from 'react-admin';

import { PickOfTheDayFormFields } from './PickOfTheDayFormFields';
import { diffPickOfTheDay, sanitizePickOfTheDayPayload } from './pickOfTheDayPayload';

export const PickOfTheDayEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  return (
    <Edit
      mutationOptions={{
        onSuccess: () => {
          notify('Pick of the Day updated successfully');
          redirect('/pick_of_the_day');
        },
        onError: () => {
          notify('Failed to update Pick of the Day', { type: 'error' });
        },
      }}
      transform={(data, { previousData }) => {
        const changed = diffPickOfTheDay(data, previousData) || {};
        return sanitizePickOfTheDayPayload(changed);
      }}
    >
      <SimpleForm>
        <PickOfTheDayFormFields />
        <BooleanInput source="is_premium" label="Is Premium?" />
      </SimpleForm>
    </Edit>
  );
};

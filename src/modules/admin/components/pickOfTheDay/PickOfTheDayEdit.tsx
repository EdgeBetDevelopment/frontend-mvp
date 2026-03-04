import {
  BooleanInput,
  Edit,
  SimpleForm,
  useNotify,
  useRedirect,
  Toolbar,
  SaveButton,
  DeleteButton,
  useRecordContext,
} from 'react-admin';
import { useAuth } from '@/context/AuthContext';

import { PickOfTheDayFormFields } from './PickOfTheDayFormFields';
import {
  diffPickOfTheDay,
  sanitizePickOfTheDayPayload,
} from './pickOfTheDayPayload';

const EditToolbar = () => {
  const record = useRecordContext();
  const { isSuperAdmin } = useAuth();

  const canEdit = record?.is_owner || isSuperAdmin;

  return (
    <Toolbar>
      <SaveButton disabled={!canEdit} />
      <DeleteButton disabled={!canEdit} />
    </Toolbar>
  );
};

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
        onError: (error: any) => {
          console.error('Update error:', error);
          const errorMessage =
            error?.message || 'Failed to update Pick of the Day';

          if (error?.status === 403 || errorMessage.includes('403')) {
            notify('You do not have permission to edit this prediction', {
              type: 'error',
            });
            redirect('/pick_of_the_day');
          } else {
            notify(errorMessage, { type: 'error' });
          }
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
      <SimpleForm toolbar={<EditToolbar />}>
        <PickOfTheDayFormFields />
        <BooleanInput source="is_premium" label="Is Premium?" />
      </SimpleForm>
    </Edit>
  );
};

import { DeleteIcon } from 'lucide-react';
import {
  Button,
  useDelete,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin';
import { useAuth } from '@/context/AuthContext';

export const DeleteGamePredictionButton = () => {
  const [deleteOne, { isLoading }] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();
  const { isSuperAdmin } = useAuth();

  const canDelete = record?.is_owner || isSuperAdmin;

  const handleClick = () => {
    if (!record?.id || !canDelete) return;

    deleteOne(
      'pick_of_the_day',
      { id: record.id },
      {
        onSuccess: () => {
          notify('Game prediction deleted', { type: 'info' });
          refresh();
        },
        onError: (error: any) => {
          const errorMessage = error?.message || 'Error deleting prediction';
          if (error?.status === 403 || errorMessage.includes('403')) {
            notify('You do not have permission to delete this prediction', {
              type: 'error',
            });
          } else {
            notify(`Error: ${errorMessage}`, { type: 'warning' });
          }
        },
      },
    );
  };

  return (
    <Button
      label="Delete Prediction"
      onClick={handleClick}
      disabled={isLoading || !canDelete}
    >
      <DeleteIcon />
    </Button>
  );
};

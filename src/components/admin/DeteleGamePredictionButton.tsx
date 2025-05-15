import { DeleteIcon } from 'lucide-react';
import {
  Button,
  useDelete,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin';

export const DeleteGamePredictionButton = () => {
  const [deleteOne, { isLoading }] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();

  const handleClick = () => {
    if (!record?.game_prediction?.id) return;

    deleteOne(
      'pick_of_the_day',
      { id: record.game_prediction.id },
      {
        onSuccess: () => {
          notify('Game prediction deleted', { type: 'info' });
          refresh();
        },
        onError: (error: any) => {
          notify(`Error: ${error.message}`, { type: 'warning' });
        },
      },
    );
  };

  return (
    <Button
      label="Delete Prediction"
      onClick={handleClick}
      disabled={isLoading}
    >
      <DeleteIcon />
    </Button>
  );
};

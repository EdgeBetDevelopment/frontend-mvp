import { EditButton, useRecordContext } from 'react-admin';
import { useAuth } from '@/context/AuthContext';

export const PickOfTheDayEditButton = () => {
  const record = useRecordContext();
  const { isSuperAdmin } = useAuth();

  const canEdit = record?.is_owner || isSuperAdmin;

  return <EditButton disabled={!canEdit} />;
};

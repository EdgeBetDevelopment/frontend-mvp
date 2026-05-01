import type { ApiPick } from '../types';
import { ApiPickCard } from './ApiPickCard';

interface PicksListProps {
  picks: ApiPick[];
  isLoading: boolean;
  isError: boolean;
  emptyMessage: string;
  onUnlock: () => void;
}

export const PicksList = ({ picks, isLoading, isError, emptyMessage, onUnlock }: PicksListProps) => {
  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading...</div>;
  }
  if (isError) {
    return <div className="text-center text-red-500">Error loading picks</div>;
  }
  if (picks.length === 0) {
    return <div className="text-center text-muted-foreground">{emptyMessage}</div>;
  }
  return (
    <div className="space-y-6">
      {picks.map((pick) => (
        <ApiPickCard key={pick.id} pick={pick} onUnlock={onUnlock} />
      ))}
    </div>
  );
};

import { Loader2, Trash2 } from 'lucide-react';

interface DeleteHistoryModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export const DeleteHistoryModal = ({
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteHistoryModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="mx-4 w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl">
        <h2 className="mb-2 font-display text-lg font-bold text-foreground">
          Delete Bet History
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Are you sure you want to delete all your bet history? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

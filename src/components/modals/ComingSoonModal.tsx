import { Button } from '../../ui/button';
import { Dialog, DialogContent } from '../../ui/dialog';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full flex-col items-center gap-6 p-6 text-center sm:max-w-[500px]">
        <div className="flex flex-col gap-3">
          <div className="text-primary-brand text-xl font-medium tracking-widest uppercase">
            Coming Soon
          </div>

          <h3 className="text-text-secondary text-xl font-semibold">
            Predictions for this sport are not available yet
          </h3>
        </div>

        <Button
          variant="gradient"
          onClick={onClose}
          className="w-full max-w-[120px] px-8"
        >
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonModal;

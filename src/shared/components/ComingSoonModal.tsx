import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Button } from './button';
import { Dialog, DialogContent, DialogTitle } from './dialog';

interface ComingSoonModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full flex-col items-center gap-6 p-6 text-center sm:max-w-[500px]">
        <VisuallyHidden>
          <DialogTitle>Coming Soon Sports Betting</DialogTitle>
        </VisuallyHidden>

        <div className="flex flex-col gap-3">
          <div className="text-primary-brand text-xl font-medium tracking-widest uppercase">
            {title}
          </div>

          <h3 className="text-text-secondary text-xl font-semibold">
            {description ||
              'This feature is coming soon! Stay tuned for updates.'}
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

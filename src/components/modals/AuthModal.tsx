import { toast } from 'sonner';

import { Dialog, DialogContent } from '../../ui/dialog';
import LoginForm from '../auth/LoginForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const onSuccessLogin = () => {
    onClose();
    toast.success('Login successful!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full flex-col items-center gap-6 p-6 text-center sm:max-w-[500px]">
        <LoginForm
          title="Create an account to get started"
          onSuccessLogin={onSuccessLogin}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

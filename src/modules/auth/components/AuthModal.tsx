import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogTitle } from "@/shared/components";
import LoginForm from "./sign-in/LoginForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const handleLoginSuccess = () => {
    onClose();
    toast.success("Login successful!");
  };

  const handleGoogleLoginSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full flex-col items-center gap-6 p-6 text-center sm:max-w-[500px]">
        <VisuallyHidden>
          <DialogTitle>Login Form</DialogTitle>
        </VisuallyHidden>

        <LoginForm
          title="Create an account to get started"
          onSuccessLogin={handleLoginSuccess}
          onGoogleLoginSuccess={handleGoogleLoginSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

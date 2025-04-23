import { ReactNode } from 'react';

import { Button } from '../ui/button';

interface IAuthButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode;
  disabled?: boolean;
  handleClick?: (e: React.FormEvent) => void;
}

const AuthButton: React.FC<IAuthButtonProps> = ({
  type,
  children,
  handleClick,
  disabled,
}) => {
  return (
    <Button
      disabled={disabled}
      className="auth-button flex w-full max-w-[480px] cursor-pointer flex-row items-center justify-center rounded-xl bg-[#282828] p-4 text-center text-2xl font-bold"
      onClick={() => handleClick}
      type={type}
    >
      {children}
    </Button>
  );
};

export default AuthButton;

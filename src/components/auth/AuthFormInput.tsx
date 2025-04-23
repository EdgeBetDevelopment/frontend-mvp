import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';

import ShowIcon from '@/assets/icons/iconamoon_eye-light.svg';

interface IAuthFormInputProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  name?: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  showPassword?: boolean;
  disabled?: boolean;
  error?: string;
}

const AuthFormInput: React.FC<IAuthFormInputProps> = ({
  placeholder,
  name,
  type,
  handleChange,
  value,
  setShowPassword,
  showPassword,
  error,
  disabled,
}) => {
  return (
    <div className="relative w-full max-w-[800px]">
      <input
        disabled={disabled}
        className="auth-input w-full rounded-2xl bg-[#282828] px-5 py-4 text-[18px] focus:outline-0"
        type={showPassword ? 'text' : type}
        value={value}
        name={name}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />

      {setShowPassword && (
        <ShowIcon
          className="absolute top-[50%] left-[94%] translate-[-50%] transform cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
          alt="show"
        />
      )}

      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default AuthFormInput;

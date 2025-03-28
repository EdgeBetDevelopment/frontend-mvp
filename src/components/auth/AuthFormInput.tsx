import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';

import ShowIcon from '@/assets/icons/iconamoon_eye-light.svg';

interface IAuthFormInputProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  showPassword?: boolean;
}

const AuthFormInput: React.FC<IAuthFormInputProps> = ({
  placeholder,
  type,
  handleChange,
  value,
  setShowPassword,
  showPassword,
}) => {
  return (
    <div className="relative w-full max-w-[800px]">
      <input
        className="auth-input w-full rounded-2xl bg-[#282828] px-5 py-4 text-[18px] focus:outline-0"
        type={showPassword ? 'text' : type}
        value={value}
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
    </div>
  );
};

export default AuthFormInput;

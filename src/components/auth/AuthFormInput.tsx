import React, { useState } from 'react';
import { LuEye } from 'react-icons/lu';
import { LuEyeClosed } from 'react-icons/lu';

interface IAuthFormInputProps {
  placeholder: string;
  type: 'text' | 'password' | 'email' | 'number' | 'tel';
  name?: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
  passwordToggle?: boolean;
}

const AuthFormInput: React.FC<IAuthFormInputProps> = ({
  placeholder,
  name,
  type,
  handleChange,
  value,
  disabled,
  error,
  maxLength,
  passwordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    passwordToggle && type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type;

  return (
    <div className="w-full max-w-[800px] transition-all">
      <div className="relative">
        <input
          disabled={disabled}
          className="auth-input w-full rounded-2xl bg-[#282828] px-5 py-4 text-[18px] transition-all focus:outline-0"
          type={inputType}
          value={value}
          maxLength={maxLength}
          name={name}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
        />

        {passwordToggle && type === 'password' && (
          <span
            className="absolute top-1/2 left-[94%] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-2xl text-[#B3B3B3]"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            role="button"
            tabIndex={0}
          >
            {showPassword ? <LuEye /> : <LuEyeClosed />}
          </span>
        )}
      </div>

      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default AuthFormInput;

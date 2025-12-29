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
          className="w-full rounded-xl border border-border bg-secondary px-5 py-4 text-base transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          type={inputType}
          value={value}
          maxLength={maxLength}
          name={name}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
        />

        {passwordToggle && type === 'password' && (
          <span
            className="absolute left-[94%] top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-2xl text-[#B3B3B3]"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            role="button"
            tabIndex={0}
          >
            {showPassword ? <LuEye /> : <LuEyeClosed />}
          </span>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default AuthFormInput;

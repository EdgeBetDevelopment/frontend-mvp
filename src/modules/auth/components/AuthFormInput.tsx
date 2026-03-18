"use client";

import React, { useState } from "react";
import { LuEye, LuEyeClosed, LuPhone } from 'react-icons/lu';

interface IAuthFormInputProps {
  placeholder: string;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'phone';
  name?: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
  passwordToggle?: boolean;
}

const filterPhone = (raw: string): string => {
  const hasPlus = raw.startsWith('+');
  const digits = raw.replace(/\D/g, '');
  return hasPlus ? '+' + digits : digits;
};

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

  const isPhone = type === 'phone';

  const inputType = isPhone
    ? 'tel'
    : passwordToggle && type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    handleChange(isPhone ? filterPhone(raw) : raw);
  };

  return (
    <div className="w-full max-w-[800px] transition-all">
      <div className="relative">
        {isPhone && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground pointer-events-none">
            <LuPhone />
          </span>
        )}

        <input
          disabled={disabled}
          className={`w-full rounded-xl border border-border bg-secondary py-4 text-base transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${isPhone ? 'pl-11 pr-5' : 'px-5'}`}
          type={inputType}
          inputMode={isPhone ? 'numeric' : undefined}
          value={value}
          maxLength={maxLength}
          name={name}
          onChange={handleInputChange}
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

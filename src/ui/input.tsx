'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'text-[18px] placeholder:text-text-gray  file:text-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-[16px] px-[24px] py-[14.5px] font-normal tracking-normal shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'border-border border bg-surface-primary',
        clear:
          'bg-transparent border-0 shadow-none focus-visible:border-none focus-visible:ring-0 ring-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface IInput extends React.ComponentProps<'input'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'file';
  className?: string;
  containerClassName?: string;
  label?: string;
  variant?: 'default' | 'clear';
  icon?: React.ReactNode;
  id?: string;
}

function Input({
  className,
  containerClassName,
  icon,
  type,
  id,
  variant,
  label,
  ...props
}: IInput) {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="text-text-dark mb-3 block text-lg font-normal tracking-normal"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute top-1/2 left-5 -translate-y-1/2 transform">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          data-slot="input"
          className={cn(
            inputVariants({ variant, className }),
            icon ? 'pl-12' : '',
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { Input };

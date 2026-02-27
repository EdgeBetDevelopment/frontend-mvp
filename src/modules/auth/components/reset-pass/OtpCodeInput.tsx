"use client";

import React from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/input-otp";
import { FormField } from "@/shared/components/form";

import { verifyCodeSchema } from "./VerificationCodeForm";

const OtpCodeInput = () => {
  const form = useFormContext<z.infer<typeof verifyCodeSchema>>();

  const { errors } = form.formState;

  return (
    <div className="w-full">
      <div>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <div>
              <InputOTP
                value={field.value}
                onChange={field.onChange}
                pattern={REGEXP_ONLY_DIGITS}
                maxLength={6}
              >
                <InputOTPGroup className="flex w-full items-center justify-center gap-2 rounded-[20px] px-[46px] py-[18px]">
                  {Array.from({ length: 6 }, (_, index) => (
                    <CodeInputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
        />

        <div className="text-center text-lg text-red-500">
          {errors.code?.message}
        </div>
      </div>
    </div>
  );
};

export default OtpCodeInput;

export const CodeInputOTPSlot = ({ index }: { index: number }) => {
  return (
    <InputOTPSlot
      caretClassName="h-[28px] w-[2px] "
      className="text-text-dark border-border data-[active=true]:ring-border h-[68px] w-[68px] rounded-[10px]! bg-[#282828] text-2xl leading-6 font-semibold tracking-normal shadow-none"
      index={index}
    />
  );
};

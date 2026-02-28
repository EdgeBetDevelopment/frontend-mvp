"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/components/button";
import GoogleLoginButton from "../GoogleLoginButton";
import H2 from "../H2";

import BaseLoginForm from "./BaseLoginForm";

interface ILoginForm {
  title?: string;
  onSuccessLogin?: () => void;
  onGoogleLoginSuccess?: () => void;
  on2FARequired?: (tempToken: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const LoginForm = ({
  title = "Welcome!",
  onSuccessLogin,
  onGoogleLoginSuccess,
  on2FARequired,
}: ILoginForm) => {
  const router = useRouter();

  const handleGoogleSuccess = () => {
    if (onGoogleLoginSuccess) {
      onGoogleLoginSuccess();
    } else {
      router.push(ROUTES.HOME);
    }
  };

  const startWhopLogin = () => {
    window.location.href = `${API_URL}/auth/api/v1/auth/login_whop`;
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <H2 text={title} />

      <GoogleLoginButton
        onSuccess={handleGoogleSuccess}
        text="Sign in with Google"
      />
      <Button
        onClick={startWhopLogin}
        className="w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xl font-bold tracking-normal text-foreground transition-all duration-200 hover:bg-secondary/80"
      >
        Sign in with Whop
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Or, Sign in with email
      </p>

      <BaseLoginForm
        onSuccessLogin={onSuccessLogin}
        on2FARequired={on2FARequired}
      />
    </div>
  );
};

export default LoginForm;

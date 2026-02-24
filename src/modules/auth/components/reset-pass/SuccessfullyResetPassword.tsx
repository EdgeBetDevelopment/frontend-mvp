"use client";

import { useRouter } from "next/navigation";

import H2 from "@/modules/auth/components/H2";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/components/button";

import ArrowRight from "@/assets/icons/arrow-right.svg";

export default function SuccessfullyResetPassword() {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-[520px] flex-col items-center justify-center gap-8">
      <div>
        <H2 text="Successfully" />
        <p className="text-center text-sm text-muted-foreground">
          Your Password has been reset
        </p>
      </div>

      <Button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xl font-semibold text-foreground transition-all duration-200 hover:bg-secondary/80"
        onClick={() => router.push(ROUTES.AUTH.LOGIN)}
      >
        <span>Go to Login</span>
        <ArrowRight />
      </Button>
    </div>
  );
}

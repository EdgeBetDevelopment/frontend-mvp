"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { handleFetchError } from "@/utils/error-handling";

import authService from "../services";
import { useAuth } from "../store";

interface Use2FALoginProps {
  onSuccess?: () => void;
  tempToken: string;
}

export const use2FALogin = ({ onSuccess, tempToken }: Use2FALoginProps) => {
  const { setTokens } = useAuth();
  const router = useRouter();

  const verify2FAMutation = useMutation({
    mutationFn: (code: string) =>
      authService.login2FA({ code, temp_token: tempToken }),
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isAdmin: data.is_admin,
        isSuperAdmin: data.is_super_admin,
      });

      // Redirect to admin if user is admin or super admin
      if (data.is_admin || data.is_super_admin) {
        router.push("/admin");
        return;
      }

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        "Invalid verification code. Please try again.",
      );
      toast.error(errorMessage);
    },
  });

  const backupLoginMutation = useMutation({
    mutationFn: (backupCode: string) =>
      authService.login2FABackup({ code: backupCode, temp_token: tempToken }),
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isAdmin: data.is_admin,
        isSuperAdmin: data.is_super_admin,
      });

      // Redirect to admin if user is admin or super admin
      if (data.is_admin || data.is_super_admin) {
        router.push("/admin");
        return;
      }

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        "Invalid backup code. Please try again.",
      );
      toast.error(errorMessage);
    },
  });

  return {
    verify2FA: verify2FAMutation.mutate,
    loginWithBackup: backupLoginMutation.mutate,
    isVerifying: verify2FAMutation.isPending,
    isBackupLoading: backupLoginMutation.isPending,
    verifyError: verify2FAMutation.error
      ? handleFetchError(verify2FAMutation.error, "Invalid code")
      : undefined,
    backupError: backupLoginMutation.error
      ? handleFetchError(backupLoginMutation.error, "Invalid code")
      : undefined,
  };
};

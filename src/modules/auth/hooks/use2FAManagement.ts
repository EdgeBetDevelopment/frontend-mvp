import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { profileService } from '@/modules/profile/services';
import { handleFetchError } from '@/utils/error-handling';

interface Use2FAManagementProps {
  onEnableSuccess?: (qrCodeUrl: string) => void;
  onConfirmSuccess?: (backupCodes: string[]) => void;
  onDisableSuccess?: () => void;
  onRecoverySuccess?: (qrCodeUrl: string) => void;
}

export const use2FAManagement = ({
  onEnableSuccess,
  onConfirmSuccess,
  onDisableSuccess,
  onRecoverySuccess,
}: Use2FAManagementProps = {}) => {
  const queryClient = useQueryClient();

  const enableMutation = useMutation({
    mutationFn: () => profileService.enable2FA(),
    onSuccess: (data) => {
      console.log('2FA Enable Success:', data);
      if (onEnableSuccess) {
        onEnableSuccess(data.qr_uri);
      }
    },
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        'Failed to enable 2FA. Please try again.',
      );
      toast.error(errorMessage);
    },
  });

  const confirmMutation = useMutation({
    mutationFn: (code: string) => profileService.confirm2FA(code),
    onSuccess: (data) => {
      toast.success('Two-factor authentication enabled successfully!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      if (onConfirmSuccess) {
        onConfirmSuccess(data.backup_codes);
      }
    },
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        'Invalid verification code. Please try again.',
      );
      toast.error(errorMessage);
    },
  });

  const disableMutation = useMutation({
    mutationFn: (code: string) => profileService.disable2FA(code),
    onSuccess: () => {
      toast.success('Two-factor authentication disabled successfully!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      if (onDisableSuccess) {
        onDisableSuccess();
      }
    },
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        'Failed to disable 2FA. Please check your code.',
      );
      toast.error(errorMessage);
    },
  });

  const recoveryMutation = useMutation({
    mutationFn: (backupCode: string) => profileService.recover2FA(backupCode),
    onSuccess: (data) => {
      toast.success('Recovery initiated. Please set up 2FA again.');
      if (onRecoverySuccess) {
        onRecoverySuccess(data.qr_uri);
      }
    },
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        'Invalid backup code. Please try again.',
      );
      toast.error(errorMessage);
    },
  });

  return {
    enable2FA: enableMutation.mutate,
    confirm2FA: confirmMutation.mutate,
    disable2FA: disableMutation.mutate,
    recover2FA: recoveryMutation.mutate,
    isEnabling: enableMutation.isPending,
    isConfirming: confirmMutation.isPending,
    isDisabling: disableMutation.isPending,
    isRecovering: recoveryMutation.isPending,
  };
};

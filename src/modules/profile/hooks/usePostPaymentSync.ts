'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/modules/auth';
import { paymentService } from '@/modules/pricing';

export function usePostPaymentSync() {
  const { refreshSubscriptionStatus } = useAuth();
  const searchParams = useSearchParams();
  const qc = useQueryClient();
  const router = useRouter();

  const [successOpen, setSuccessOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const cancel = searchParams.get('cancel');

    if (!sessionId && cancel !== 'true') return;

    router.replace('/profile');

    if (cancel === 'true') {
      setFailedOpen(true);
      return;
    }

    if (sessionId) {
      paymentService.getPaymentStatus(sessionId).then((res) => {
        if (res.status === 'paid') {
          qc.invalidateQueries({ queryKey: ['user'] });
          qc.invalidateQueries({ queryKey: ['subscriptions'] });
          qc.removeQueries({ queryKey: ['pick-of-day'] });
          refreshSubscriptionStatus();
          setSuccessOpen(true);
        } else {
          setFailedOpen(true);
        }
      }).catch(() => {
        setFailedOpen(true);
      });
    }
  }, [searchParams, router, qc, refreshSubscriptionStatus]);

  return {
    successOpen,
    failedOpen,
    closeSuccess: () => setSuccessOpen(false),
    closeFailed: () => setFailedOpen(false),
  };
}

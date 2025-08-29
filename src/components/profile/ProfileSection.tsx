'use client';

import { useState } from 'react';

import paymentService from '@/services/payment';

import { GeneralInformation } from './GeneralInformation';
import { ModalProfile } from './Modal';
import { Subscription } from './Subscription';

export function ProfileSection() {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [subIdToCancel, setSubIdToCancel] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [typeIdToCancel, setTypeIdToCancel] = useState<number | null>(null);

  const handleRequestCancel = (id: number, typeId: number) => {
    setSubIdToCancel(id);
    setIsCancelOpen(true);
    setTypeIdToCancel(typeId);
  };

  const handleConfirmCancel = async () => {
    if (!subIdToCancel && !typeIdToCancel) return;
    try {
      await paymentService.cancelSubscription(
        subIdToCancel as number,
        typeIdToCancel as number,
      );
      setReloadKey((k) => k + 1);
    } catch (e) {
      console.error('cancel subscription error:', e);
    } finally {
      setIsCancelOpen(false);
      setSubIdToCancel(null);
    }
  };

  return (
    <>
      <GeneralInformation />
      <Subscription
        onRequestCancel={handleRequestCancel}
        reloadKey={reloadKey}
      />

      <ModalProfile
        title="Cancel Subscription"
        firstColor="white"
        desciption={`Are you sure you want to cancel your subscription?
You’ll keep access to premium features until it ends, after which your account will switch to the free plan.`}
        open={isCancelOpen}
        firstText="Cancel Subscription"
        secondText="Keep Subscription"
        firstOnClick={handleConfirmCancel}
        secondOnClick={() => setIsCancelOpen(false)}
        onClose={() => setIsCancelOpen(false)}
      />
    </>
  );
}

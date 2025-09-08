'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import paymentService from '@/services/payment';
import { userService } from '@/services/user';
import { Button } from '@/ui/button';

import { ModalProfile } from './Modal';

type Sub = {
  id: number;
  type_id: number;
  type?: { name?: string };
  status: string;

  created_at: string;
};

export const Subscription = () => {
  const qc = useQueryClient();

  const {
    data: subscriptions,
    isLoading,
    isError,
    refetch,
  } = useQuery<Sub[]>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const me = await userService.getMe();
      return me?.subscriptions ?? [];
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);

  const cancelMutation = useMutation({
    mutationFn: async (data: { selectedId: number; selectedTypeId: number }) =>
      paymentService.cancelSubscription(data.selectedId, data.selectedTypeId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['subscriptions'] });
      qc.invalidateQueries({ queryKey: ['me'] });
    },
    onSettled: () => {
      setOpen(false);
      setSelectedId(null);
      setSelectedTypeId(null);
    },
  });

  const onAskCancel = (id: number, typeId: number) => {
    setSelectedId(id);
    setSelectedTypeId(typeId);
    setOpen(true);
  };

  const onConfirmCancel = () => {
    if (selectedId && selectedTypeId)
      cancelMutation.mutate({ selectedId, selectedTypeId });
  };

  if (isLoading) {
    return (
      <div className="mb-[90px] flex w-[calc(100%_-_40px)] max-w-[720px] flex-col gap-5 rounded-xl bg-[linear-gradient(112.71deg,_rgba(23,23,23,0.6)_19.64%,_rgba(105,105,105,0.316464)_55.1%,_rgba(125,125,125,0.06)_92%)] p-6 backdrop-blur-[20px] md:mx-0 md:w-full">
        <h5 className="text-xl font-medium">Subscription</h5>
        <p className="mt-2 text-sm text-gray-400">Loading…</p>
      </div>
    );
  }

  if (isError || !subscriptions?.length) {
    return (
      <div className="mb-[90px] flex w-[calc(100%_-_40px)] max-w-[720px] flex-col gap-3 rounded-xl bg-[linear-gradient(112.71deg,_rgba(23,23,23,0.6)_19.64%,_rgba(105,105,105,0.316464)_55.1%,_rgba(125,125,125,0.06)_92%)] p-6 backdrop-blur-[20px] md:mx-0 md:w-full">
        <h5 className="text-xl font-medium">Subscription</h5>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-400">No active subscriptions</p>
          <Button variant="outline" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-[90px] flex w-[calc(100%_-_40px)] max-w-[720px] flex-col gap-5 rounded-xl bg-[linear-gradient(112.71deg,_rgba(23,23,23,0.6)_19.64%,_rgba(105,105,105,0.316464)_55.1%,_rgba(125,125,125,0.06)_92%)] p-6 backdrop-blur-[20px] md:mx-0 md:w-full">
        <h5 className="text-xl font-medium">Subscription</h5>
        <div className="flex flex-col gap-3">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex flex-col">
              <p>
                <span className="font-semibold">Your Subscription: </span>
                {sub?.type?.name || `Type ${sub.type_id}`}
              </p>
              <p className="text-sm text-gray-400">
                Status: {sub.status} | Started:{' '}
                {new Date(sub.created_at).toLocaleDateString()}
              </p>
              <Button
                variant="outline"
                className="mt-6 w-fit bg-[linear-gradient(180deg,_rgba(255,255,255,0.03)_0%,_rgba(255,255,255,0.1)_100%)] shadow-[0_-1px_0_0_#00000033_inset,0_0_0_1px_#FFFFFF40,0_1px_0_0_#FFFFFF0D_inset]"
                onClick={() => onAskCancel(sub.id, sub.type_id)}
              >
                Cancel Subscription
              </Button>
            </div>
          ))}
        </div>
      </div>

      <ModalProfile
        title="Cancel Subscription"
        firstColor="white"
        desciption={`Are you sure you want to cancel your subscription?
You’ll keep access to premium features until it ends, after which your account will switch to the free plan.`}
        open={open}
        firstText={
          cancelMutation.isPending ? 'Cancelling…' : 'Cancel Subscription'
        }
        secondText="Keep Subscription"
        firstOnClick={onConfirmCancel}
        secondOnClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

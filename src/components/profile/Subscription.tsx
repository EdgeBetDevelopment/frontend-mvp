'use client';

import { useEffect, useState } from 'react';

import { userService } from '@/services/user';
import { Button } from '@/ui/button';

type Sub = { id: number; type_id: number; status: string; created_at: string };

export const Subscription = ({
  onRequestCancel,
  reloadKey,
}: {
  onRequestCancel: (id: number, typeId: number) => void;
  reloadKey?: number;
}) => {
  const [subscriptions, setSubscriptions] = useState<Sub[]>([]);

  const fetchSubs = async () => {
    try {
      const me = await userService.getMe();
      setSubscriptions(me?.subscriptions ?? []);
    } catch (e) {
      console.error('getMe error:', e);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, [reloadKey]);

  if (!subscriptions?.length) {
    return (
      <div className="mb-[90px] flex w-[calc(100%_-_40px)] max-w-[720px] flex-col gap-5 rounded-xl bg-[linear-gradient(112.71deg,_rgba(23,23,23,0.6)_19.64%,_rgba(105,105,105,0.316464)_55.1%,_rgba(125,125,125,0.06)_92%)] p-6 backdrop-blur-[20px] md:mx-0 md:w-full">
        <h5 className="text-xl font-medium">Subscription</h5>
        <p className="mt-2 text-sm text-gray-400">No active subscriptions</p>
      </div>
    );
  }

  return (
    <div className="mb-[90px] flex w-[calc(100%_-_40px)] max-w-[720px] flex-col gap-5 rounded-xl bg-[linear-gradient(112.71deg,_rgba(23,23,23,0.6)_19.64%,_rgba(105,105,105,0.316464)_55.1%,_rgba(125,125,125,0.06)_92%)] p-6 backdrop-blur-[20px] md:mx-0 md:w-full">
      <h5 className="text-xl font-medium">Subscription</h5>
      <div className="flex flex-col gap-3">
        {subscriptions?.map((sub) => (
          <div key={sub.id} className="flex flex-col">
            <p>
              <span className="font-semibold">Your Subscription: </span>
              {sub.type_id === 1 ? 'Lorem Ipsum dolor' : `Type ${sub.type_id}`}
            </p>
            <p className="text-sm text-gray-400">
              Status: {sub.status} | Started:{' '}
              {new Date(sub.created_at).toLocaleDateString()}
            </p>
            <Button
              variant="outline"
              className="mt-6 w-fit bg-[linear-gradient(180deg,_rgba(255,255,255,0.03)_0%,_rgba(255,255,255,0.1)_100%)] shadow-[0_-1px_0_0_#00000033_inset,0_0_0_1px_#FFFFFF40,0_1px_0_0_#FFFFFF0D_inset]"
              onClick={() => onRequestCancel(sub?.id, sub?.type_id)}
            >
              Cancel Subscription
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

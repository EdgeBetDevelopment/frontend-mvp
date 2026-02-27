'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreditCard, Calendar, Loader2 } from 'lucide-react';

import { paymentService } from '@/modules/pricing';
import { authService, useAuth } from '@/modules/auth';
import { userService } from '@/modules/profile/services';
import { Button } from '@/shared/components/button';
import { Separator } from '@/shared/components/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import { Badge } from '@/shared/components/badge';

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
  const { refreshToken, setTokens } = useAuth();

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

  const handleRefresh = async () => {
    await refetch();

    if (refreshToken) {
      try {
        const response = await authService.refreshToken(refreshToken);
        if (response.token) {
          setTokens({ accessToken: response.token });
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }
  };

  const cancelMutation = useMutation({
    mutationFn: async (data: { selectedId: number; selectedTypeId: number }) =>
      paymentService.cancelSubscription(data.selectedId, data.selectedTypeId),
    onSuccess: async () => {
      if (refreshToken) {
        try {
          const response = await authService.refreshToken(refreshToken);
          if (response.token) {
            setTokens({ accessToken: response.token });
          }
          console.log(response.token);
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      }

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
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Subscription</CardTitle>
              <CardDescription>
                Your current plan and billing details
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !subscriptions?.length) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Subscription</CardTitle>
              <CardDescription>
                Your current plan and billing details
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            No active subscriptions
          </p>
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="border-border"
          >
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Subscription</CardTitle>
                <CardDescription>
                  Your current plan and billing details
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriptions.map((sub) => {
            const startDate = new Date(sub.created_at);
            const nextBillingDate = new Date(startDate);
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

            return (
              <div key={sub.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary text-primary-foreground">
                    {sub?.type?.name || `Plan Type ${sub.type_id}`}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Billing Cycle</span>
                    </div>
                    <p className="font-semibold">Monthly</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Next Billing Date</span>
                    </div>
                    <p className="font-semibold">
                      {nextBillingDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div>
                  <Button
                    variant="ghost"
                    onClick={() => onAskCancel(sub.id, sub.type_id)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <ModalProfile
        title="Cancel Subscription"
        firstColor="white"
        desciption={`Are you sure you want to cancel your subscription?
You'll keep access to premium features until it ends, after which your account will switch to the free plan.`}
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

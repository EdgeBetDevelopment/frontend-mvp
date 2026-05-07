'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { useAuth } from '@/modules/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function WhopAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setTokens, setAuthLoading } = useAuth();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || (state && state !== 'whop')) return;

    setAuthLoading(true);

    (async () => {
      try {
        const url = `${API_URL}/auth/api/v1/auth/callback_whop?code=${encodeURIComponent(
          code,
        )}`;

        const resp = await fetch(url, {
          method: 'POST',
          headers: { Accept: 'application/json' },
        });

        if (!resp.ok) {
          console.error('Whop callback failed', resp.status);
          toast.error('Whop login failed');
          setAuthLoading(false);
          return;
        }

        let data: any = null;
        const text = await resp.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = null;
          }
        }

        const accessToken =
          data?.access ?? data?.access_token ?? data?.token ?? null;

        const refreshToken = data?.refresh ?? data?.refresh_token ?? null;

        if (accessToken) {
          setTokens({ accessToken, refreshToken: refreshToken ?? undefined });
          toast.success('Logged in with Whop!');
        }
        router.replace(window.location.pathname);
      } catch (e) {
        console.error('Whop callback error', e);
        toast.error('Whop login failed');
      } finally {
        setAuthLoading(false);
      }
    })();
  }, [searchParams, router, setTokens, setAuthLoading]);

  return null;
}

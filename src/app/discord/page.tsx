'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { profileService } from '@/modules/profile/services';
import { ROUTES } from '@/shared/config/routes';
import Loader from '@/shared/components/loader';

export default function DiscordCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      setError('Missing OAuth parameters.');
      return;
    }

    profileService
      .discordCallback(code, state)
      .then(() => router.push(ROUTES.PROFILE.PROFILE))
      .catch(() => setError('Failed to connect Discord. Please try again.'));
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Loader />
      <p className="text-muted-foreground">Connecting Discord…</p>
    </div>
  );
}

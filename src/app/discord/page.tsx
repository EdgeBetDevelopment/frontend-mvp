import { redirect } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes';

interface PageProps {
  searchParams: Promise<{ code?: string; state?: string }>;
}

export default async function DiscordCallbackPage({ searchParams }: PageProps) {
  const { code, state } = await searchParams;

  if (!code || !state) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">Missing OAuth parameters.</p>
      </div>
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/user/api/v1/discord/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">Failed to connect Discord. Please try again.</p>
      </div>
    );
  }

  redirect(ROUTES.PROFILE.PROFILE);
}

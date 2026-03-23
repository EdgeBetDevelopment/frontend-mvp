'use client';

import { useState } from 'react';
import { SiDiscord } from 'react-icons/si';

import { profileService } from '@/modules/profile/services';
import { Button } from '@/shared/components/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import Loader from '@/shared/components/loader';

interface DiscordConnectProps {
  discordUserId?: string | null;
}

export function DiscordConnect({ discordUserId }: DiscordConnectProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const { url } = await profileService.getDiscordOAuthLink();
      window.location.href = url;
    } catch (e) {
      console.error('Discord OAuth link error:', e);
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <SiDiscord className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Discord</CardTitle>
              <CardDescription>
                {discordUserId
                  ? 'Your Discord account is linked'
                  : 'Connect your Discord account'}
              </CardDescription>
            </div>
          </div>

          {discordUserId ? (
            <span className="rounded-full border border-primary bg-transparent px-3 py-1 text-sm text-primary">
              Connected
            </span>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleConnect}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? <Loader /> : 'Connect'}
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

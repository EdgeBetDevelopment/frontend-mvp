'use client';

import { useParams } from 'next/navigation';
import PlayerProfile from '@/modules/player/components/PlayerProfile';
import TennisPlayerProfile from '@/modules/player/components/TennisPlayerProfile';

export default function Player() {
  const params = useParams();
  const id = params?.id as string;

  if (id?.startsWith('tennis-')) {
    return <TennisPlayerProfile />;
  }

  return <PlayerProfile />;
}

'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { playerApi } from '@/modules/player';

interface TennisSearchResult {
  player_id?: number | string;
  full_name?: string;
}

/**
 * Names in the games feed come in two shapes — "Anna Bondar" from one provider,
 * "C. Bucsa" from another — and the surname is the only part both always carry,
 * so it is what we search on and what we match results by. The initial, when
 * the feed gives one, then separates same-surname players.
 */
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim();

const surnameOf = (name: string) => {
  const parts = normalize(name).split(' ').filter(Boolean);
  return parts[parts.length - 1] ?? '';
};

const initialOf = (name: string) => {
  const parts = normalize(name).split(' ').filter(Boolean);
  return parts.length > 1 ? parts[0].charAt(0) : '';
};

/**
 * Doubles entries are a pair of surnames ("Kempen/ Panova") with no single
 * profile behind them, so they stay unlinked.
 */
export const isLinkableTennisPlayer = (name?: string | null) =>
  !!name?.trim() && !name.includes('/');

const pickMatch = (name: string, results: TennisSearchResult[]) => {
  const withId = results.filter((p) => p?.player_id != null && p.full_name);
  const surname = surnameOf(name);
  const sameSurname = withId.filter((p) => surnameOf(p.full_name!) === surname);
  const pool = sameSurname.length > 0 ? sameSurname : withId;

  const initial = initialOf(name);
  const byInitial = initial
    ? pool.find((p) => initialOf(p.full_name!).startsWith(initial))
    : undefined;

  return byInitial ?? pool[0] ?? null;
};

/**
 * The tennis games feed carries no player ids, only names, so a profile route
 * has to be resolved through the player search on demand. Resolving on click
 * rather than on render keeps a grid of cards from firing a search per player.
 */
export const useTennisPlayerProfile = () => {
  const router = useRouter();
  const [pendingName, setPendingName] = useState<string | null>(null);

  const openProfile = useCallback(
    async (name: string) => {
      if (!isLinkableTennisPlayer(name) || pendingName) return;

      setPendingName(name);
      try {
        const results = await playerApi.searchTennisPlayer(surnameOf(name));
        const match = pickMatch(name, results ?? []);

        if (!match) {
          toast.error(`No player profile found for ${name}`);
          return;
        }

        router.push(`/player/tennis-${match.player_id}`);
      } catch {
        toast.error('Could not open the player profile');
      } finally {
        setPendingName(null);
      }
    },
    [pendingName, router],
  );

  return { openProfile, pendingName };
};

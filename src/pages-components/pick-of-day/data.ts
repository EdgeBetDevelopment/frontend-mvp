import type { ModeratorPick } from './types';

export const moderators = {
  premier: {
    name: 'Premier',
    avatar: 'P',
    color: 'from-amber-500 to-orange-600',
    record: '127-89',
    winRate: 58.8,
    unitPL: 47.2,
  },
  kelly: {
    name: 'Kelly',
    avatar: 'K',
    color: 'from-emerald-500 to-teal-600',
    record: '142-101',
    winRate: 58.4,
    unitPL: 52.8,
  },
  rondo: {
    name: 'Rondo',
    avatar: 'R',
    color: 'from-violet-500 to-purple-600',
    record: '118-85',
    winRate: 58.1,
    unitPL: 38.5,
  },
};

export const mockPicks: ModeratorPick[] = [
  {
    id: '1',
    moderator: moderators.premier,
    sport: 'NBA',
    game: 'Lakers vs Celtics',
    pick: 'Lakers +4.5',
    odds: '-110',
    confidence: 'lock',
    analysis:
      "Lakers have covered in 7 of their last 10 games against the Celtics. LeBron is playing at an MVP level and the team's defense has improved significantly. This spread is too generous.",
    postedAt: '2 hours ago',
    units: 3,
  },
  {
    id: '2',
    moderator: moderators.kelly,
    sport: 'NFL',
    game: 'Chiefs vs Bills',
    pick: 'Over 48.5',
    odds: '-115',
    confidence: 'high',
    analysis:
      'Both offenses are firing on all cylinders. Mahomes and Allen have combined for 50+ points in their last 3 meetings. Weather looks clear for Sunday.',
    postedAt: '4 hours ago',
    units: 2,
  },
  {
    id: '3',
    moderator: moderators.rondo,
    sport: 'NHL',
    game: 'Maple Leafs vs Bruins',
    pick: 'Maple Leafs ML',
    odds: '+135',
    confidence: 'medium',
    analysis:
      'Value play here. Leafs are coming off back-to-back wins and their power play has been lethal. Bruins missing key defenseman which should open up scoring opportunities.',
    postedAt: '6 hours ago',
    units: 1,
  },
];

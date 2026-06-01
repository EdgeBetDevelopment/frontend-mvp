export interface TennisPlayerAchievement {
  label: string;
}

export interface TennisRecentGame {
  date: string;
  tournament: string;
  city: string;
  surface: 'Hard' | 'Hard (Indoor)' | 'Clay' | 'Grass';
  round: string;
  opponentName: string;
  opponentRank: number;
  result: 'W' | 'L';
  score: string;
  aces: number;
}

export interface TennisSeasonStats {
  wins: number;
  losses: number;
  titles: number;
  aces: number;
  firstServePct: number;
  winPct: number;
  ranking: number;
  prizeMoney: number;
  breakPtsWon: number;
  tieBreaksWon: number;
}

export interface TennisCareerSeason {
  year: string;
  wins: number;
  titles: number;
  aces: number;
}

export interface TennisPlayer {
  id: string;
  name: string;
  country: string;
  position: string;
  birthday: string;
  height: string;
  weight: string;
  experience: string;
  achievements: TennisPlayerAchievement[];
  recentGames: TennisRecentGame[];
  seasonStats: TennisSeasonStats;
  careerProgression: TennisCareerSeason[];
}

export const TENNIS_PLAYERS: Record<string, TennisPlayer> = {
  'tennis-ben-shelton': {
    id: 'tennis-ben-shelton',
    name: 'Ben Shelton',
    country: 'USA',
    position: 'Singles Player',
    birthday: 'Oct 9, 2002',
    height: '6\'4"',
    weight: '195 lbs',
    experience: '3 years',
    achievements: [
      { label: 'US Open SF' },
      { label: 'ATP 500 Winner' },
      { label: 'ATP Finals Qualifier' },
    ],
    recentGames: [
      {
        date: 'Nov 15',
        tournament: 'ATP Finals',
        city: 'Turin',
        surface: 'Hard (Indoor)',
        round: 'RR',
        opponentName: 'J. Sinner',
        opponentRank: 1,
        result: 'L',
        score: '3-6, 6-7',
        aces: 8,
      },
      {
        date: 'Nov 13',
        tournament: 'ATP Finals',
        city: 'Turin',
        surface: 'Hard (Indoor)',
        round: 'RR',
        opponentName: 'F. Auger-Aliassime',
        opponentRank: 6,
        result: 'L',
        score: '6-4, 6-7, 5-7',
        aces: 14,
      },
      {
        date: 'Nov 11',
        tournament: 'ATP Finals',
        city: 'Turin',
        surface: 'Hard (Indoor)',
        round: 'RR',
        opponentName: 'A. Zverev',
        opponentRank: 3,
        result: 'L',
        score: '3-6, 6-7',
        aces: 10,
      },
      {
        date: 'Nov 2',
        tournament: 'Paris Masters',
        city: 'Paris',
        surface: 'Hard (Indoor)',
        round: 'R64',
        opponentName: 'P. Carreno Busta',
        opponentRank: 137,
        result: 'W',
        score: '6-4, 6-2, 6-4',
        aces: 12,
      },
      {
        date: 'Nov 1',
        tournament: 'Paris Masters',
        city: 'Paris',
        surface: 'Hard (Indoor)',
        round: 'R128',
        opponentName: 'I. Buse',
        opponentRank: 135,
        result: 'W',
        score: '6-3, 6-2, 6-4',
        aces: 11,
      },
      {
        date: 'Oct 27',
        tournament: 'Swiss Indoors',
        city: 'Basel',
        surface: 'Hard (Indoor)',
        round: 'QF',
        opponentName: 'A. Zverev',
        opponentRank: 3,
        result: 'L',
        score: '2-6, 2-6',
        aces: 5,
      },
      {
        date: 'Oct 25',
        tournament: 'Swiss Indoors',
        city: 'Basel',
        surface: 'Hard (Indoor)',
        round: 'R16',
        opponentName: 'J. Lehecka',
        opponentRank: 26,
        result: 'W',
        score: '6-4, 6-4',
        aces: 14,
      },
      {
        date: 'Oct 23',
        tournament: 'Swiss Indoors',
        city: 'Basel',
        surface: 'Hard (Indoor)',
        round: 'R32',
        opponentName: 'P. Bautista Agut',
        opponentRank: 38,
        result: 'W',
        score: '6-3, 6-4',
        aces: 9,
      },
      {
        date: 'Apr 11',
        tournament: 'US Clay Court',
        city: 'Houston',
        surface: 'Clay',
        round: 'QF',
        opponentName: 'A. de Minaur',
        opponentRank: 8,
        result: 'W',
        score: '6-3, 6-4',
        aces: 12,
      },
      {
        date: 'Jan 22',
        tournament: 'Australian Open',
        city: 'Melbourne',
        surface: 'Hard',
        round: 'QF',
        opponentName: 'J. Sinner',
        opponentRank: 1,
        result: 'L',
        score: '6-7, 4-6, 4-6',
        aces: 15,
      },
      {
        date: 'Jan 20',
        tournament: 'Australian Open',
        city: 'Melbourne',
        surface: 'Hard',
        round: 'R16',
        opponentName: 'L. Sonego',
        opponentRank: 47,
        result: 'W',
        score: '3-6, 6-1, 7-6, 7-5',
        aces: 22,
      },
    ],
    seasonStats: {
      wins: 40,
      losses: 24,
      titles: 1,
      aces: 612,
      firstServePct: 63.8,
      winPct: 62.5,
      ranking: 9,
      prizeMoney: 4600654,
      breakPtsWon: 43.2,
      tieBreaksWon: 58.3,
    },
    careerProgression: [
      { year: '2022', wins: 10, titles: 0, aces: 187 },
      { year: '2023', wins: 42, titles: 1, aces: 523 },
      { year: '2024', wins: 36, titles: 1, aces: 489 },
      { year: '2025', wins: 40, titles: 1, aces: 612 },
    ],
  },
  'tennis-jannik-sinner': {
    id: 'tennis-jannik-sinner',
    name: 'Jannik Sinner',
    country: 'ITA',
    position: 'Singles Player',
    birthday: 'Aug 16, 2001',
    height: '6\'2"',
    weight: '170 lbs',
    experience: '5 years',
    achievements: [
      { label: 'Australian Open' },
      { label: 'US Open' },
      { label: 'ATP Finals' },
      { label: 'World No.1' },
    ],
    recentGames: [
      {
        date: 'Nov 17',
        tournament: 'ATP Finals',
        city: 'Turin',
        surface: 'Hard (Indoor)',
        round: 'F',
        opponentName: 'T. Fritz',
        opponentRank: 4,
        result: 'W',
        score: '6-4, 6-4',
        aces: 5,
      },
      {
        date: 'Nov 15',
        tournament: 'ATP Finals',
        city: 'Turin',
        surface: 'Hard (Indoor)',
        round: 'SF',
        opponentName: 'B. Shelton',
        opponentRank: 14,
        result: 'W',
        score: '6-3, 7-6',
        aces: 4,
      },
      {
        date: 'Nov 13',
        tournament: 'ATP Finals',
        city: 'Turin',
        surface: 'Hard (Indoor)',
        round: 'RR',
        opponentName: 'D. Medvedev',
        opponentRank: 5,
        result: 'W',
        score: '6-3, 6-4',
        aces: 7,
      },
      {
        date: 'Nov 11',
        tournament: 'ATP Finals',
        city: 'Turin',
        surface: 'Hard (Indoor)',
        round: 'RR',
        opponentName: 'A. Zverev',
        opponentRank: 3,
        result: 'W',
        score: '6-4, 7-6',
        aces: 6,
      },
      {
        date: 'Oct 20',
        tournament: 'Vienna Open',
        city: 'Vienna',
        surface: 'Hard (Indoor)',
        round: 'F',
        opponentName: 'H. Hurkacz',
        opponentRank: 7,
        result: 'W',
        score: '6-3, 6-4',
        aces: 8,
      },
    ],
    seasonStats: {
      wins: 67,
      losses: 9,
      titles: 8,
      aces: 438,
      firstServePct: 68.2,
      winPct: 88.2,
      ranking: 1,
      prizeMoney: 18600000,
      breakPtsWon: 52.1,
      tieBreaksWon: 71.4,
    },
    careerProgression: [
      { year: '2022', wins: 37, titles: 2, aces: 312 },
      { year: '2023', wins: 52, titles: 4, aces: 398 },
      { year: '2024', wins: 73, titles: 8, aces: 455 },
      { year: '2025', wins: 67, titles: 8, aces: 438 },
    ],
  },
};

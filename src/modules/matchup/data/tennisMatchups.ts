export type Sportsbook =
  | 'DraftKings'
  | 'FanDuel'
  | 'BetMGM'
  | 'Caesars'
  | 'PointsBet'
  | 'BetRivers';

export interface TennisMarket {
  label: string;
  odds?: string;
  books: Sportsbook[];
  market_type?: string;
  selection?: string;
  line?: number | null;
  player_key?: number | null;
}

export type TennisTour = 'ATP' | 'WTA';

export interface TennisPlayer {
  name: string;
  country: string;
  /** Null for doubles pairs and anyone the feed has no ranking for. */
  rank: number | null;
  seed?: string;
  form: string[];
  injuryStatus: string;
  /** Which tour the ranking belongs to. Null when the feed doesn't say. */
  tour?: TennisTour | null;
}

export interface TennisMarketExtended {
  category: string;
  label: string;
  odds: string;
}

export interface TennisMatchup {
  id: string;
  player1: TennisPlayer;
  player2: TennisPlayer;
  date: string;
  time: string;
  tournament: string;
  tournamentType: string;
  round: string;
  surface: 'Clay' | 'Grass' | 'Hard Court';
  format: string;
  aiPick: string;
  markets: TennisMarketExtended[];
  valueBets: TennisMarket[];
  conservativeBets: TennisMarket[];
  // API-sourced fields (optional, present when data comes from the real API)
  overview?: string;
  analysis?: string;
  h2hScore?: string;
  winProbabilityPlayer1?: number;
  winProbabilityPlayer2?: number;
  status?: 'scheduled' | 'live' | 'finished' | null;
  category?: string | null;
  discipline?: string | null;
  /** Why value bets are empty, straight from the model. */
  valueBetsEmptyReason?: string | null;
  /** Why conservative bets are empty, straight from the model. */
  conservativeBetsEmptyReason?: string | null;
  /** Why nothing on this fixture could be priced at all. */
  betsUnpriceableReason?: string | null;
}

const ALL_BOOKS: Sportsbook[] = [
  'DraftKings',
  'FanDuel',
  'BetMGM',
  'Caesars',
  'PointsBet',
  'BetRivers',
];

export const tennisMatchups: TennisMatchup[] = [
  {
    id: 't1',
    player1: {
      name: 'Jannik Sinner',
      country: 'ITA',
      rank: 1,
      seed: '1',
      form: ['W', 'W', 'W', 'L', 'W'],
      injuryStatus: 'Healthy',
    },
    player2: {
      name: 'Carlos Alcaraz',
      country: 'ESP',
      rank: 3,
      seed: '3',
      form: ['W', 'L', 'W', 'W', 'W'],
      injuryStatus: 'Healthy',
    },
    date: '05/22/2025',
    time: '02:00 PM',
    tournament: 'Roland Garros',
    tournamentType: 'ATP Grand Slam',
    round: 'Semifinals',
    surface: 'Clay',
    format: 'Best of 5',
    aiPick: 'Jannik Sinner',
    markets: [
      { category: 'Match Winner', label: 'Sinner to Win Match', odds: '-160' },
      { category: 'Set Betting', label: 'Sinner 3-1', odds: '+210' },
      { category: 'Set Betting', label: 'Sinner 3-2', odds: '+280' },
      { category: 'Totals', label: 'Under 4.5 Sets', odds: '-175' },
      { category: 'Totals', label: 'Over 3.5 Sets', odds: '+110' },
      { category: 'Player Props', label: 'Alcaraz to Win Set 1', odds: '-115' },
    ],
    valueBets: [
      {
        label: 'Alcaraz to Win Match',
        odds: '+135',
        books: ['DraftKings', 'FanDuel', 'BetMGM'],
      },
      {
        label: 'Over 3.5 Sets',
        odds: '+110',
        books: ['DraftKings', 'FanDuel', 'Caesars'],
      },
      {
        label: 'Alcaraz to Win Set 1',
        odds: '-115',
        books: ['BetMGM', 'PointsBet', 'BetRivers'],
      },
    ],
    conservativeBets: [
      {
        label: 'Sinner to Win Match',
        odds: '-160',
        books: ALL_BOOKS,
      },
      {
        label: 'Under 4.5 Sets',
        odds: '-175',
        books: ['DraftKings', 'FanDuel', 'BetMGM'],
      },
      {
        label: 'Sinner to Win at Least One Set',
        odds: '-310',
        books: ['DraftKings', 'FanDuel', 'Caesars'],
      },
    ],
  },
  {
    id: 't2',
    player1: {
      name: 'Novak Djokovic',
      country: 'SRB',
      rank: 5,
      seed: '5',
      form: ['W', 'W', 'L', 'W', 'W'],
      injuryStatus: 'Minor knee concern',
    },
    player2: {
      name: 'Alexander Zverev',
      country: 'GER',
      rank: 4,
      seed: '4',
      form: ['W', 'W', 'W', 'W', 'L'],
      injuryStatus: 'Healthy',
    },
    date: '05/22/2025',
    time: '11:00 AM',
    tournament: 'Roland Garros',
    tournamentType: 'ATP Grand Slam',
    round: 'Semifinals',
    surface: 'Clay',
    format: 'Best of 5',
    aiPick: 'Alexander Zverev',
    markets: [
      { category: 'Match Winner', label: 'Zverev to Win Match', odds: '+145' },
      {
        category: 'Match Winner',
        label: 'Djokovic to Win Match',
        odds: '-175',
      },
      { category: 'Set Betting', label: 'Zverev 3-2', odds: '+380' },
      { category: 'Totals', label: 'Over 3.5 Sets', odds: '+120' },
      { category: 'Totals', label: 'Under 4.5 Sets', odds: '-165' },
      { category: 'Player Props', label: 'Zverev to Win Set 1', odds: '+105' },
    ],
    valueBets: [
      {
        label: 'Zverev to Win Match',
        odds: '+145',
        books: ['DraftKings', 'FanDuel', 'BetMGM'],
      },
      {
        label: 'Over 3.5 Sets',
        odds: '+120',
        books: ['DraftKings', 'Caesars', 'PointsBet'],
      },
      {
        label: 'Zverev to Win Set 1',
        odds: '+105',
        books: ['FanDuel', 'BetMGM', 'BetRivers'],
      },
    ],
    conservativeBets: [
      {
        label: 'Djokovic to Win Match',
        odds: '-175',
        books: ALL_BOOKS,
      },
      {
        label: 'Under 4.5 Sets',
        odds: '-165',
        books: ['DraftKings', 'FanDuel', 'BetMGM'],
      },
      {
        label: 'Djokovic to Win at Least 2 Sets',
        odds: '-220',
        books: ['DraftKings', 'FanDuel', 'Caesars'],
      },
    ],
  },
  {
    id: 't3',
    player1: {
      name: 'Iga Swiatek',
      country: 'POL',
      rank: 1,
      seed: '1',
      form: ['W', 'W', 'W', 'W', 'W'],
      injuryStatus: 'Healthy',
    },
    player2: {
      name: 'Coco Gauff',
      country: 'USA',
      rank: 2,
      seed: '2',
      form: ['W', 'W', 'L', 'W', 'W'],
      injuryStatus: 'Healthy',
    },
    date: '05/22/2025',
    time: '06:00 AM',
    tournament: 'Roland Garros',
    tournamentType: 'WTA Grand Slam',
    round: 'Semifinals',
    surface: 'Clay',
    format: 'Best of 3',
    aiPick: 'Iga Swiatek',
    markets: [
      { category: 'Match Winner', label: 'Swiatek to Win Match', odds: '-280' },
      { category: 'Set Betting', label: 'Swiatek 2-0', odds: '-165' },
      { category: 'Set Betting', label: 'Swiatek 2-1', odds: '+240' },
      { category: 'Totals', label: 'Under 3.5 Sets', odds: '-195' },
      { category: 'Handicap', label: 'Swiatek -3.5 Games', odds: '-115' },
      { category: 'Player Props', label: 'Gauff to Win Set 1', odds: '+145' },
    ],
    valueBets: [
      {
        label: 'Gauff to Win Set 1',
        odds: '+145',
        books: ['DraftKings', 'FanDuel', 'BetMGM'],
      },
      {
        label: 'Over 2.5 Sets',
        odds: '+130',
        books: ['DraftKings', 'Caesars', 'PointsBet'],
      },
      {
        label: 'Swiatek -3.5 Games',
        odds: '-115',
        books: ['FanDuel', 'BetMGM', 'BetRivers'],
      },
    ],
    conservativeBets: [
      {
        label: 'Swiatek to Win Match',
        odds: '-280',
        books: ALL_BOOKS,
      },
      {
        label: 'Under 3.5 Sets',
        odds: '-195',
        books: ['DraftKings', 'FanDuel', 'BetMGM'],
      },
      {
        label: 'Swiatek to Win in 2 Sets',
        odds: '-165',
        books: ['DraftKings', 'FanDuel', 'Caesars'],
      },
    ],
  },
  {
    id: 't4',
    player1: {
      name: 'Daniil Medvedev',
      country: 'RUS',
      rank: 7,
      seed: '7',
      form: ['L', 'W', 'W', 'W', 'L'],
      injuryStatus: 'Shoulder stiffness',
    },
    player2: {
      name: 'Casper Ruud',
      country: 'NOR',
      rank: 9,
      seed: '9',
      form: ['W', 'W', 'W', 'L', 'W'],
      injuryStatus: 'Healthy',
    },
    date: '05/23/2025',
    time: '09:00 AM',
    tournament: 'Roland Garros',
    tournamentType: 'ATP Grand Slam',
    round: 'Quarterfinals',
    surface: 'Clay',
    format: 'Best of 5',
    aiPick: 'Casper Ruud',
    markets: [
      { category: 'Match Winner', label: 'Ruud to Win Match', odds: '+165' },
      {
        category: 'Match Winner',
        label: 'Medvedev to Win Match',
        odds: '-200',
      },
      { category: 'Set Betting', label: 'Ruud 3-2', odds: '+420' },
      { category: 'Totals', label: 'Over 4.5 Sets', odds: '+140' },
      { category: 'Totals', label: 'Under 5.5 Sets', odds: '-185' },
      { category: 'Player Props', label: 'Ruud to Win Set 1', odds: '+130' },
    ],
    valueBets: [
      {
        label: 'Ruud to Win Match',
        odds: '+165',
        books: ['DraftKings', 'FanDuel', 'Caesars'],
      },
      {
        label: 'Over 4.5 Sets',
        odds: '+140',
        books: ['DraftKings', 'BetMGM', 'PointsBet'],
      },
      {
        label: 'Ruud to Win Set 1',
        odds: '+130',
        books: ['FanDuel', 'BetMGM', 'BetRivers'],
      },
    ],
    conservativeBets: [
      {
        label: 'Medvedev to Win Match',
        odds: '-200',
        books: ALL_BOOKS,
      },
      {
        label: 'Under 5.5 Sets',
        odds: '-185',
        books: ['DraftKings', 'FanDuel', 'BetMGM'],
      },
      {
        label: 'Medvedev to Win at Least 2 Sets',
        odds: '-245',
        books: ['DraftKings', 'FanDuel', 'Caesars'],
      },
    ],
  },
];

// Types
export type {
  ITeam,
  TeamStatistics,
  Player,
  Injury,
  Game,
  SocialMedia,
  TeamSearchResult,
} from './types';

// Services
export { teamService } from './services';

// Components
export {
  TeamHeader,
  TeamStatsCards,
  TeamInfo,
  InjuryReport,
  UpcomingGames,
  RecentResults,
  RosterTable,
  ScheduleView,
  TeamStatsOverview,
  TeamStatsChart,
  TeamStatsTable,
  TeamPageContent,
} from './components';

// Constants
export {
  CHART_COLORS,
  METRIC_DESCRIPTIONS,
  STAT_ORDER,
  STAT_LABELS,
} from './constants';

// Utils
export type { ChartDataPoint, ProcessedStats } from './utils';
export {
  generateOverviewChartData,
  generateDetailedChartData,
  calculateWinPercentage,
  processTeamStats,
} from './utils';

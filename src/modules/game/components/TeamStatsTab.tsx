import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import { Badge } from '@/shared/components/badge';
import { TeamGameData } from '../types';
import PlayerStatsTable from './PlayerStatsTable';

interface TeamStatsTabProps {
  team: TeamGameData;
  opponentScore: number;
}

const TeamStatsTab = ({ team, opponentScore }: TeamStatsTabProps) => (
  <Card className="border-border bg-card">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {team.teamName} Player Stats
        {team.score > opponentScore && (
          <Badge className="bg-emerald-500/20 text-emerald-400">Winner</Badge>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <PlayerStatsTable players={team.players} teamAbbr={team.teamTricode} />
    </CardContent>
  </Card>
);

export default TeamStatsTab;

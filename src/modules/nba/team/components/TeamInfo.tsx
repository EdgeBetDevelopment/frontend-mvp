import { Trophy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { ITeam } from '../types';

interface TeamInfoProps {
  team: ITeam;
}

export const TeamInfo = ({ team }: TeamInfoProps) => {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Team Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Founded</span>
          <span>{team.year_founded}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Arena</span>
          <span>{team.arena}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Capacity</span>
          <span>{team.arena_capacity?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Coach</span>
          <span>{team.head_coach}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">GM</span>
          <span>{team.general_manager}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Owner</span>
          <span>{team.owner}</span>
        </div>
      </CardContent>
    </Card>
  );
};

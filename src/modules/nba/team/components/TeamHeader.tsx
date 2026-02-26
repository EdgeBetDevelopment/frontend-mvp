import { MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import { ITeam } from '../types';

interface TeamHeaderProps {
  team: ITeam;
  winPct: string | null;
  onBack: () => void;
}

export const TeamHeader = ({ team, winPct, onBack }: TeamHeaderProps) => {
  return (
    <>
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-center">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl text-4xl font-bold"
            style={{
              backgroundColor: '#1e293b20',
              border: '2px solid #1e293b',
            }}
          >
            {team.abbreviation}
          </div>
          <div className="flex-1">
            <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">
              {team.full_name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {team.city}
              </span>
              <span>{team.league_standings?.Conference} Conference</span>
              <span>{team.league_standings?.Division} Division</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">
              {team.overall_stats?.W}-{team.overall_stats?.L}
            </div>
            <div className="text-muted-foreground">{winPct}% Win Rate</div>
          </div>
        </div>
      </div>
    </>
  );
};

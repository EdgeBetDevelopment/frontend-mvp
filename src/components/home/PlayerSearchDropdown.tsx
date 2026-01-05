import { AvatarImage, AvatarFallback, Avatar } from '@/ui/avatar';
import { Users } from 'lucide-react';

interface PlayerSearchDropdownProps {
  searchQuery: string;
  searchResults?: any[];
  isLoading?: boolean;
  onPlayerSelect?: (player: { id: string; name: string }) => void;
  onTeamSelect?: (team: { id: string; name: string }) => void;
}

const PlayerSearchDropdown = ({
  searchQuery,
  searchResults,
  isLoading,
  onPlayerSelect,
  onTeamSelect,
}: PlayerSearchDropdownProps) => {
  const filteredTeams = searchResults
    ? searchResults.filter((item: any) => item.type === 'team')
    : [];

  const filteredPlayers = searchResults
    ? searchResults.filter((item: any) => item.type === 'player')
    : [];

  if (!searchQuery) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 animate-fade-in overflow-hidden rounded-lg border border-border bg-card shadow-lg">
        <div className="flex h-[240px] items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (filteredPlayers.length === 0 && filteredTeams.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 animate-fade-in overflow-hidden rounded-lg border border-border bg-card shadow-lg">
        <div className="flex h-[240px] items-center justify-center">
          <div className="text-muted-foreground">No items found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[400px] animate-fade-in overflow-hidden overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
      {filteredTeams.length > 0 && (
        <div>
          <div className="bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Teams
          </div>
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              onClick={() =>
                onTeamSelect?.({
                  id: team.id,
                  name: team.full_name || team.name,
                })
              }
              className="flex cursor-pointer items-center gap-4 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-muted/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold text-foreground">
                    {team.full_name || team.name}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {team.sport}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {team.abbreviation}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredPlayers.length > 0 && (
        <div>
          <div className="bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Players
          </div>
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              onClick={() =>
                onPlayerSelect?.({
                  id: player.id,
                  name: player.full_name || player.name,
                })
              }
              className="flex cursor-pointer items-center gap-4 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-muted/50"
            >
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage
                  src={player.avatar}
                  alt={player.full_name || player.name}
                />
                <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                  {(player.full_name || player.name)
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold text-foreground">
                    {player.full_name || player.name}
                  </span>
                  {player.team_abbreviation && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {player.team_abbreviation}
                    </span>
                  )}
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {player.sport}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {player.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerSearchDropdown;

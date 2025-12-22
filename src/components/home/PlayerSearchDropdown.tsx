import {AvatarImage, AvatarFallback, Avatar} from "@/ui/avatar";
import { Users } from "lucide-react";

interface Player {
    id: string;
    name: string;
    team: string;
    position: string;
    sport: string;
    avatar?: string;
}

interface Team {
    id: string;
    name: string;
    abbreviation: string;
    sport: string;
}

const players: Player[] = [
    {
        id: "sga",
        name: "Shai Gilgeous-Alexander",
        team: "Oklahoma City Thunder",
        position: "Point Guard",
        sport: "NBA",
    },
    {
        id: "lebron-james",
        name: "LeBron James",
        team: "Los Angeles Lakers",
        position: "Small Forward",
        sport: "NBA",
    },
    {
        id: "victor-wembanyama",
        name: "Victor Wembanyama",
        team: "San Antonio Spurs",
        position: "Center",
        sport: "NBA",
    },
    {
        id: "anthony-davis",
        name: "Anthony Davis",
        team: "Los Angeles Lakers",
        position: "Power Forward",
        sport: "NBA",
    },
    {
        id: "chet-holmgren",
        name: "Chet Holmgren",
        team: "Oklahoma City Thunder",
        position: "Center",
        sport: "NBA",
    },
    {
        id: "judge",
        name: "Aaron Judge",
        team: "New York Yankees",
        position: "Outfielder",
        sport: "MLB",
    },
    {
        id: "stafford",
        name: "Matthew Stafford",
        team: "Los Angeles Rams",
        position: "Quarterback",
        sport: "NFL",
    },
    {
        id: "shelton",
        name: "Ben Shelton",
        team: "USA",
        position: "Singles Player",
        sport: "Tennis",
    },
];

const teams: Team[] = [
    { id: "san-antonio-spurs", name: "San Antonio Spurs", abbreviation: "SAS", sport: "NBA" },
    { id: "oklahoma-city-thunder", name: "Oklahoma City Thunder", abbreviation: "OKC", sport: "NBA" },
    { id: "los-angeles-lakers", name: "Los Angeles Lakers", abbreviation: "LAL", sport: "NBA" },
    { id: "golden-state-warriors", name: "Golden State Warriors", abbreviation: "GSW", sport: "NBA" },
    { id: "boston-celtics", name: "Boston Celtics", abbreviation: "BOS", sport: "NBA" },
    { id: "miami-heat", name: "Miami Heat", abbreviation: "MIA", sport: "NBA" },
    { id: "phoenix-suns", name: "Phoenix Suns", abbreviation: "PHX", sport: "NBA" },
    { id: "denver-nuggets", name: "Denver Nuggets", abbreviation: "DEN", sport: "NBA" },
    { id: "milwaukee-bucks", name: "Milwaukee Bucks", abbreviation: "MIL", sport: "NBA" },
    { id: "cleveland-cavaliers", name: "Cleveland Cavaliers", abbreviation: "CLE", sport: "NBA" },
];

interface PlayerSearchDropdownProps {
    searchQuery: string;
    onPlayerSelect?: (player: { id: string; name: string }) => void;
    onTeamSelect?: (team: { id: string; name: string }) => void;
}

const PlayerSearchDropdown = ({ searchQuery, onPlayerSelect, onTeamSelect }: PlayerSearchDropdownProps) => {
    const query = searchQuery.toLowerCase();

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(query) ||
        player.team.toLowerCase().includes(query)
    );

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(query) ||
        team.abbreviation.toLowerCase().includes(query)
    );

    if (!searchQuery || (filteredPlayers.length === 0 && filteredTeams.length === 0)) {
        return null;
    }

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in max-h-[400px] overflow-y-auto">
            {filteredTeams.length > 0 && (
                <div>
                    <div className="px-4 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Teams
                    </div>
                    {filteredTeams.map((team) => (
                        <div
                            key={team.id}
                            onClick={() => onTeamSelect?.(team)}
                            className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border last:border-b-0"
                        >
                            <div className="h-12 w-12 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-foreground truncate">{team.name}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
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
                    <div className="px-4 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Players
                    </div>
                    {filteredPlayers.map((player) => (
                        <div
                            key={player.id}
                            onClick={() => onPlayerSelect?.(player)}
                            className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border last:border-b-0"
                        >
                            <Avatar className="h-12 w-12 border-2 border-primary/20">
                                <AvatarImage src={player.avatar} alt={player.name} />
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-foreground truncate">{player.name}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {player.sport}
                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {player.team} • {player.position}
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
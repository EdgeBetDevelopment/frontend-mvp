import { teamApi } from "@/modules/team";
import { playerApi } from "@/modules/player";

export const searchApi = {
  async searchTeamsAndPlayers(query: string): Promise<any[]> {
    const [teams, players, tennisPlayers] = await Promise.all([
      teamApi.searchTeam(query),
      playerApi.searchPlayer(query),
      playerApi.searchTennisPlayer(query).catch(() => []),
    ]);

    const normalizedTeams = teams.map((team: any) => ({
      ...team,
      type: "team",
      full_name: team.full_name,
    }));

    const normalizedPlayers = players.map((player: any) => ({
      ...player,
      type: "player",
      full_name: player.full_name,
    }));

    const normalizedTennisPlayers = tennisPlayers.map((player: any) => ({
      id: player.player_id,
      full_name: player.full_name,
      type: "player",
      sport: "Tennis",
      position: player.country,
      ranking: player.ranking,
      gender: player.gender,
    }));

    if (normalizedPlayers.length === 0 && normalizedTeams.length > 0) {
      const teamPlayers: any[] = [];
      normalizedTeams.forEach((team: any) => {
        if (team.players && Array.isArray(team.players)) {
          team.players.forEach((player: any) => {
            teamPlayers.push({
              ...player,
              type: "player",
              full_name: player.full_name,
              team_id: team.id,
              team_name: team.full_name,
              sport: team.sport,
              team_abbreviation: team.abbreviation,
            });
          });
        }
      });
      return [...normalizedTeams, ...teamPlayers, ...normalizedTennisPlayers];
    }

    return [...normalizedTeams, ...normalizedPlayers, ...normalizedTennisPlayers];
  },
};

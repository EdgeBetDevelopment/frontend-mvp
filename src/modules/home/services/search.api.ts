import { teamApi } from "@/modules/team";
import { playerApi } from "@/modules/player";

export const searchApi = {
  async searchTeamsAndPlayers(query: string): Promise<any[]> {
    const [teams, players] = await Promise.all([
      teamApi.searchTeam(query),
      playerApi.searchPlayer(query),
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
      return [...normalizedTeams, ...teamPlayers];
    }

    return [...normalizedTeams, ...normalizedPlayers];
  },
};

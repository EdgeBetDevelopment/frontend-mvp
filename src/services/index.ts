import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const httpClient = axios.create({
  baseURL: apiUrl,
});

const apiService = {
  async getScoreboard(): Promise<any> {
    const response = await httpClient.get(`/api/v1/nba/get_scoreboard`);

    return response.data.scoreboard;
  },

  async findTeam(query: string): Promise<any> {
    const response = await httpClient.get(`/api/v1/nba/find_team/${query}`);

    return response.data;
  },

  async searchTeam(query: string): Promise<any> {
    const response = await httpClient.get(`/api/v1/nba/search_team/${query}`);

    return response.data;
  },

  async getPlayerById(query: string): Promise<any> {
    const response = await httpClient.get(
      `/api/v1/nba/get_player_by_id/${query}`,
    );

    return response.data;
  },

  async searchPlayer(query: string): Promise<any> {
    const response = await httpClient.get(`/api/v1/nba/search_player/${query}`);

    return response.data;
  },
};

export default apiService;

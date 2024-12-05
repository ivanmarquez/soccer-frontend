
import axios from "axios";

export interface Team {
    id: number;
    name: string;
    image: string;
    league_id: number;
}

export interface Venue {
    id: number;
    name: string;
    country: string;
    location: string;
    lat: number;
    lon: number;
}

export interface WeatherPrompt {
    prompt: string;
}

export interface Match {
    id: number;
    league_id: number;
    name: string;
    timestamp: string;
    date: string;
    time: string;
    venue: Venue;
    country: string;
    image: string;
    home_team: Team;
    away_team: Team;
    prompt: WeatherPrompt;
}


export const apiFetchMatches = async (league_id: number): Promise<Match[]> => {
    const response: { data: Match[] } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/matches/${league_id}`);
    return response.data;
};

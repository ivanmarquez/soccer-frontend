import axios from "axios";

export interface League {
	id: string;
	name: string;
}


export const apiFetchLeagues = async (): Promise<League[]> => {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);
    apiUrl.protocol = 'https:';

    const response: { data: League[] } = await axios.get(`${apiUrl.toString()}/leagues`);
    return response.data;
};

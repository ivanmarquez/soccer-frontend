
import axios from "axios";

export interface League {
	id: string;
	name: string;
}


export const apiFetchLeagues = async (): Promise<League[]> => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const response: { data: League[] } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leagues`);
    return response.data;
};

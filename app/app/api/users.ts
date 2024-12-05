import axios from "axios";

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
}

export interface SigninResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface SignupResponse {
    success: boolean;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export const apiFecthSignin = async (data: LoginData): Promise<SigninResponse> => {
    const response: { data: SigninResponse } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, data);
    return response.data;
};

export const apiFecthSignup = async (data: LoginData): Promise<SignupResponse> => {
    const response: { data: SignupResponse }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, data);
    return response.data;
};

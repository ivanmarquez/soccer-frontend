import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/api/users";

export interface AuthState {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	login: (token: string, user: User) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			login: (token: string, user: User) => {
				set({ token, user, isAuthenticated: true });
			},
			logout: () => {
				set({ token: null, user: null, isAuthenticated: false });
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);

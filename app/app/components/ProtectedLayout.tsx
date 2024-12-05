"use client";

import { ReactNode } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthStore, AuthState } from "@/lib/authStore";
import { useRouter } from "next/navigation";

interface ProtectedLayoutProps {
	children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
	const { user, logout }: AuthState = useAuthStore();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-100">
				{/* Main Content Area */}
				<div className="flex-1 flex flex-col">
					{/* Header */}
					<header className="bg-white shadow p-4 flex justify-between items-center">
						<div>
							<h1 className="text-lg font-semibold text-gray-800">
								Dashboard
							</h1>
						</div>
						<div className="flex items-center space-x-4">
							{user ? (
								<>
									<span className="text-gray-700">
										{user.first_name}
									</span>
									<button
										onClick={handleLogout}
										className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
									>
										Logout
									</button>
								</>
							) : (
								<span>Loading...</span>
							)}
						</div>
					</header>

					{/* Content */}
					<main className="flex-1 p-6 overflow-y-auto">
						{children}
					</main>
				</div>
			</div>
		</ProtectedRoute>
	);
}

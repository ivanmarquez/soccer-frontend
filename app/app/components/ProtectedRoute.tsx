"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";

interface ProtectedRouteProps {
	children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = useAuthStore.getState().token;
		const isAuthenticated = useAuthStore.getState().isAuthenticated;

		if (!isAuthenticated || !token) {
			router.push("/");
		} else {
			setIsLoading(false);
		}
	}, [router]);

	if (isLoading) {
		return null;
	}

	return <>{children}</>;
}

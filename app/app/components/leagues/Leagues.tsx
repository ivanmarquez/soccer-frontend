"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { League, apiFetchLeagues } from "@/api/api";
import Loading from "@/components/Loading";
import LeagueCard from "@/components/LeagueCard";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const CACHE_KEY = "leagues_cache";
const CACHE_EXPIRATION_MS = 30 * 60 * 1000; // 30 minutes

export const Leagues = () => {
	const router = useRouter();
	const [leagues, setLeagues] = useState<League[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		NProgress.start();
		const cachedData = localStorage.getItem(CACHE_KEY);

		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData);

			if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
				setLeagues(data);
				setIsLoading(false);

				NProgress.done();

				return;
			}
		}

		apiFetchLeagues()
			.then((data) => {
				setLeagues(data);

				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ data, timestamp: Date.now() })
				);
			})
			.finally(() => {
				setIsLoading(false);
				NProgress.done();
			});
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	if (!leagues.length) {
		return <div>Leagues not found</div>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{leagues.map((league) => (
				<LeagueCard
					key={league.id}
					league={league}
					onClick={() =>
						router.push(`/dashboard/matches/${league.id}`)
					}
				/>
			))}
		</div>
	);
};

export default Leagues;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Match, apiFetchMatches } from "@/api/api";
import Loading from "@/components/Loading";
import MatchCard from "./MatchCard";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

interface MatchesProps {
	id_league: number;
}

const CACHE_KEY_PREFIX = "matches_cache_";
const CACHE_EXPIRATION_MS = 30 * 60 * 1000; // 30 minutes

export const Matches: React.FC<MatchesProps> = ({ id_league }) => {
	const router = useRouter();
	const [matches, setMatches] = useState<Match[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		NProgress.start();

		const cacheKey = `${CACHE_KEY_PREFIX}${id_league}`;
		const cachedData = localStorage.getItem(cacheKey);

		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData);

			if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
				setMatches(data);
				setIsLoading(false);

				NProgress.done();

				return;
			}
		}

		apiFetchMatches(id_league)
			.then((data: Match[]) => {
				setMatches(data);

				localStorage.setItem(
					cacheKey,
					JSON.stringify({ data, timestamp: Date.now() })
				);
			})
			.finally(() => {
				setIsLoading(false);
				NProgress.done();
			});
	}, [id_league]);

	if (isLoading) {
		return <Loading />;
	}

	if (!matches.length) {
		return <div>Matches not found</div>;
	}

	return (
		<section>
			<div className="flex justify-end">
				<button
					onClick={() => router.push("/dashboard/leagues")}
					className="mt-4 bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-900 transition"
					aria-label="Return to Leagues"
				>
					Return to Leagues
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
				{matches.map((match) => (
					<MatchCard key={match.id} match={match} />
				))}
			</div>
		</section>
	);
};

export default Matches;

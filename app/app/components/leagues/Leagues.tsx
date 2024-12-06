"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { League, apiFetchLeagues } from "@/api/api";
import Loading from "@/components/Loading";
import LeagueCard from "@/components/LeagueCard";
import SearchBar from "@/components/SearchBar";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const CACHE_KEY = "leagues_cache";
const CACHE_EXPIRATION_MS = 30 * 60 * 1000; // 30 minutes

export const Leagues = () => {
	const router = useRouter();
	const [leagues, setLeagues] = useState<League[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);

	useEffect(() => {
		const fetchLeagues = async () => {
			try {
				NProgress.start();
				const cachedData = localStorage.getItem(CACHE_KEY);

				if (cachedData) {
					const { data, timestamp } = JSON.parse(cachedData);

					if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
						setLeagues(data);
						setFilteredLeagues(data);
						setIsLoading(false);
						NProgress.done();
						return;
					}
				}

				const data = await apiFetchLeagues();
				setLeagues(data);
				setFilteredLeagues(data);
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ data, timestamp: Date.now() })
				);
			} catch (error) {
				console.error("Error fetching leagues:", error);
			} finally {
				setIsLoading(false);
				NProgress.done();
			}
		};

		fetchLeagues();
	}, []);

	const handleSearch = useCallback(
		(query: string) => {
			const lowerCaseQuery = query.toLowerCase();
			const filtered = leagues.filter((league) =>
				league.name.toLowerCase().includes(lowerCaseQuery)
			);
			setFilteredLeagues(filtered);
		},
		[leagues]
	);

	if (isLoading) {
		return <Loading />;
	}

	if (!filteredLeagues.length) {
		return (
			<div className="flex flex-col items-center">
				<SearchBar
					onSearch={handleSearch}
					placeholder="Search leagues..."
				/>
				<div className="text-gray-500 mt-4">No leagues found.</div>
			</div>
		);
	}

	return (
		<div>
			<SearchBar
				onSearch={handleSearch}
				placeholder="Search leagues..."
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
				{filteredLeagues.map((league) => (
					<LeagueCard
						key={league.id}
						league={league}
						onClick={() =>
							router.push(`/dashboard/matches/${league.id}`)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default Leagues;

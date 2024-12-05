"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const LazyLeagues = dynamic(
	() => import("@/components/leagues/Leagues").then((mod) => mod.Leagues),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

const LeaguesPage = () => {
	return (
		<main className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Soccer Leagues</h1>
			<LazyLeagues />
		</main>
	);
}

export default LeaguesPage;

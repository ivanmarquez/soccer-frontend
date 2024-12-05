"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { use } from "react"; // Import use from react

const LazyMatches = dynamic(
	() => import("@/components/matches/Matches").then((mod) => mod.Matches),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

interface Params {
	id_league: number;
}

interface MatchesPageProps {
	params: Promise<Params>;
}

const MatchesPage = ({ params }: MatchesPageProps) => {
    const { id_league } = use(params);

	return (
		<main className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Matches</h1>
			<LazyMatches id_league={id_league} />
		</main>
	);
};

export default MatchesPage;

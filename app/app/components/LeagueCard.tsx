import React from 'react';
import { League } from "@/api/api";

interface LeagueCardProps {
	league: League;
	onClick: () => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, onClick }) => {
	return (
		<article
			className="border p-4 bg-white shadow-lg rounded-lg hover:shadow-md transition cursor-pointer"
			onClick={onClick}
		>
			<header>
				<h2 className="font-semibold text-lg">
					{league.name}
				</h2>
			</header>
			<footer>
				<button
					className="mt-4 bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-900 transition w-full"
					aria-label={`View matches for ${league.name}`}
				>
					View Matches
				</button>
			</footer>
		</article>
	);
};

export default LeagueCard;

import React from "react";
import Image from "next/image";
import { Match } from "@/api/api";

interface MatchCardProps {
	match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
	return (
		<article
			key={match.id}
			className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
		>
			{/* Match Image */}
			<Image
				src={match.image}
				alt={`${match.name} thumbnail`}
				className="w-full h-32 object-cover rounded-md mb-4"
				width={500}
				height={200}
				priority
				placeholder="blur"
				blurDataURL="/images/placeholder.webp"
			/>

			{/* Match Details */}
			<h2 className="text-xl font-bold mb-2">{match.name}</h2>
			<ul className="text-gray-600 space-y-1">
				<li>
					<strong>Date:</strong> {match.date}
				</li>
				<li>
					<strong>Time:</strong> {match.time}
				</li>
				<li>
					<strong>Venue:</strong> {match.venue.name},{" "}
					{match.venue.location}, {match.venue.country}
				</li>
				<li>
					<strong>Country:</strong> {match.country}
				</li>
			</ul>

			{/* Teams Section */}
			<section className="mt-4">
				<div className="flex items-center space-x-2 mb-2">
					<Image
						src={match.home_team.image}
						alt={match.home_team.name}
						className="w-10 h-10 object-cover rounded-full"
						width={40}
						height={40}
						priority={false}
						placeholder="blur"
						blurDataURL="/images/placeholder-team.webp"
					/>
					<span className="text-gray-800">
						{match.home_team.name}
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<Image
						src={match.away_team.image}
						alt={match.away_team.name}
						className="w-10 h-10 object-cover rounded-full"
						width={40}
						height={40}
						priority={false}
						placeholder="blur"
						blurDataURL="/images/placeholder-team.webp"
					/>
					<span className="text-gray-800">
						{match.away_team.name}
					</span>
				</div>
			</section>

			{/* Weather Prompt */}
			<div className="mt-6 p-3 bg-gray-50 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                    Match Analysis:
                </h3>
				<p className="text-gray-700 whitespace-pre-line">
					{match.prompt.prompt}
				</p>
			</div>
		</article>
	);
};

export default MatchCard;

import { useState, useEffect } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
	placeholder: string; // Add placeholder prop
}

const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
	const [searchValue, setSearchValue] = useState("");
	const [debouncedValue, setDebouncedValue] = useState(searchValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(searchValue);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [searchValue]);

	useEffect(() => {
		onSearch(debouncedValue);
	}, [debouncedValue, onSearch]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchValue(query);
	};

	const handleClear = () => {
		setSearchValue("");
		onSearch("");
	};

	return (
		<div className="relative w-full mx-auto">
			<input
				type="text"
				value={searchValue}
				onChange={handleChange}
				placeholder={placeholder}
				className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
			{searchValue && (
				<button
					type="button"
					onClick={handleClear}
					className="absolute top-3 right-10 h-5 w-5 text-gray-400 focus:outline-none"
				>
					&times;
				</button>
			)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="absolute top-3 right-3 h-5 w-5 text-gray-400 pointer-events-none"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 10h7m-3-3h.01M3 10a7 7 0 1014 0 7 7 0 10-14 0z"
				/>
			</svg>
		</div>
	);
};

export default SearchBar;

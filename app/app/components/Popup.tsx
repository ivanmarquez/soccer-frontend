import React from "react";

interface PopupProps {
	message: string;
    description: string;
	onClose: () => void;
	buttonText: string;
}

const Popup = ({ message, description, onClose, buttonText }: PopupProps) => (
	<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div className="bg-white p-6 shadow-lg rounded-lg text-center">
			<h3 className="text-xl font-bold mb-4">{message}</h3>
			<p className="mb-4">{description}</p>
			<button
				onClick={onClose}
				className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-600"
			>
				{buttonText}
			</button>
		</div>
	</div>
);

export default Popup;

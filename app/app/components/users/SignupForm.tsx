"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Popup from "@/components/Popup";
import { apiFecthSignup } from "@/api/api";

interface ErrorResponse {
	detail: {
		error: string;
		message: string;
	};
}


const schema = z.object({
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

export const SignupForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleSubmitForm: SubmitHandler<FormData> = async ( data: FormData ) => {
        try {
            await apiFecthSignup(data);
			onLoginSuccess();
		} catch (error) {
			onLoginFailure(error as AxiosError<ErrorResponse>);
		}
	};

	const onLoginSuccess = () => {
		reset();
		setShowPopup(true);
	};

	const onLoginFailure = (error: AxiosError<ErrorResponse>) => {
		setErrorMessage(
			error.response?.data?.detail?.message ||
				"Signup failed. Please try again."
		);
	};

	const handleReturnToSignIn = () => {
		router.push("/");
	};

	return (
        <>
			<div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold text-center">
					Create an account
				</h2>

				<form
					onSubmit={handleSubmit(handleSubmitForm)}
					className="space-y-4"
				>
					<div>
						<label
							htmlFor="first_name"
							className="block text-sm font-medium"
						>
							First Name
						</label>
						<input
							type="text"
							id="first_name"
							{...register("first_name")}
							className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring ${
								errors.first_name
									? "border-red-500 focus:ring-red-500"
									: "focus:ring-indigo-500"
							}`}
						/>
						{errors.first_name && (
							<p className="mt-1 text-sm text-red-600">
								{errors.first_name.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="last_name"
							className="block text-sm font-medium"
						>
							Last Name
						</label>
						<input
							type="text"
							id="last_name"
							{...register("last_name")}
							className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring ${
								errors.last_name
									? "border-red-500 focus:ring-red-500"
									: "focus:ring-indigo-500"
							}`}
						/>
						{errors.last_name && (
							<p className="mt-1 text-sm text-red-600">
								{errors.last_name.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							{...register("email")}
							className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring ${
								errors.email
									? "border-red-500 focus:ring-red-500"
									: "focus:ring-indigo-500"
							}`}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							{...register("password")}
							className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring ${
								errors.password
									? "border-red-500 focus:ring-red-500"
									: "focus:ring-indigo-500"
							}`}
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>
					{errorMessage && (
						<p className="text-red-500 text-sm text-center">
							{errorMessage}
						</p>
					)}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full px-4 py-2 font-bold text-white bg-indigo-700 rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
					>
                        {isSubmitting ? "Signing up..." : "Sign Up"}
					</button>
					<button
						type="button"
						onClick={handleReturnToSignIn}
						className="w-full px-4 py-2 mt-2 font-bold text-indigo-700 bg-white border border-indigo-700 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-500"
					>
						Return to Sign In
					</button>
				</form>
			</div>

			{showPopup && (
				<Popup message="Account Created Successfully!" description="You can now log in." onClose={handleReturnToSignIn} buttonText="Go to Login" />
			)}
        </>
	);
};

export default SignupForm;

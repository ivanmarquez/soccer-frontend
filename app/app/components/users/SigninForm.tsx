"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/lib/authStore";
import { apiFecthSignin } from "@/api/api";
import { SigninResponse } from "@/api/users";

interface ErrorResponse {
	detail: {
		error: string;
		message: string;
	};
}

const schema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

export const SigninForm = () => {
	const router = useRouter();
	const login = useAuthStore((state) => state.login);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmitForm: SubmitHandler<FormData> = async (
		data: FormData
	) => {
		try {
			const response = await apiFecthSignin(data);
			onLoginSuccess(response);
		} catch (error) {
			onLoginFailure(error as AxiosError<ErrorResponse>);
		}
	};

	const onLoginSuccess = (data: SigninResponse) => {
		reset();
		login(data.access_token, data.user);
		router.push("/dashboard/leagues/");
	};

	const onLoginFailure = (error: AxiosError<ErrorResponse>) => {
		setErrorMessage(
			error.response?.data?.detail?.message ||
				"Login failed. Please try again."
		);
	};

	const handleGoToSignUp = () => {
		router.push("/signup");
	};

	return (
		<>
			<div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold text-center">Login</h2>
				<form
					onSubmit={handleSubmit(handleSubmitForm)}
					className="space-y-4"
				>
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
						{isSubmitting ? "Signing in..." : "Sign in"}
					</button>
				</form>
				<div className="text-center">
					<p className="text-sm">Don&apos;t have an account?</p>
					<button
						onClick={handleGoToSignUp}
						className="text-indigo-500 hover:underline"
					>
						Sign up
					</button>
				</div>
			</div>
		</>
	);
};

export default SigninForm;

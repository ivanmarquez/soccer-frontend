"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const LazySignupForm = dynamic(
	() => import("@/components/users/SignupForm").then((mod) => mod.SignupForm),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

const SignupPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LazySignupForm />
		</div>
	);
};

export default SignupPage;

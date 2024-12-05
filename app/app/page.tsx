"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const LazySigninForm = dynamic(
	() => import("@/components/users/SigninForm").then((mod) => mod.SigninForm),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

const SigninPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<LazySigninForm />
		</div>
	);
}

export default SigninPage;

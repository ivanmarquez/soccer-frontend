import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Soccer Wh Analyzer",
	description: "Analyze soccer matches and leagues considerind weather conditions",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</body>
		</html>
	);
}

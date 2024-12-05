import { NextApiRequest, NextApiResponse } from "next";

export default function errorHandler(
	err: any,
	req: NextApiRequest,
	res: NextApiResponse,
	next: any
) {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong!" });
}

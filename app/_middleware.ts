import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    /* const token = getToken();

	if (!token) {
		return NextResponse.redirect(new URL("/login", req.url));
	} */

	return NextResponse.next();
}

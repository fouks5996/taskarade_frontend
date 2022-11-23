import { NextResponse } from "next/server";

export default function middleware(req) {
	let verify = req.cookies.get("next-auth.session-token");
	let url = req.url;

	if (
		!verify &&
		(url === "http://localhost:3000/" ||
			url === "https://netflix-clone-frontend-seven.vercel.app/" ||
			url.includes("/") ||
			url.includes("project/") ||
			url.includes("widget/"))
	) {
		return NextResponse.redirect(
			url.includes("vercel")
				? "https://netflix-clone-frontend-seven.vercel.app/login"
				: "http://localhost:3000/auth/sign-in"
		);
	}
}

export const config = {
	matcher: ["/", "/project/:path*", "/widget/:path*"],
};

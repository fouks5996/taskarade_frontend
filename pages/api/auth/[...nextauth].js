import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth/auth";

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "Sign in with Email",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { user, jwt } = await signIn({
					email: credentials.email,
					password: credentials.password,
				});
				if (user && jwt) {
					return { ...user, jwt };
				}

				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "auth/sign-in",
		signOut: "/auth/sign-in",
	},
	callbacks: {
		jwt: async ({ token, user, account }) => {
			const isSignIn = !!user;
			if (isSignIn) {
				switch (account.type) {
					case "credentials": {
						token.id = user.id;
						token.jwt = user.jwt;
						break;
					}
					default: {
						const response = await fetch(
							`http://localhost:1337/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
						);
						const data = await response.json();
						token.jwt = data.jwt;
						token.id = data.user.id;
					}
				}
			}
			return Promise.resolve(token);
		},
		session: async ({ session, token }) => {
			session.id = token.id;
			session.jwt = token.jwt;
			return Promise.resolve(session);
		},
	},
});

import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps, AuthProps } from "next/app";



function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			{Component.auth ? (
				<Auth>
					<Component {...pageProps} />
				</Auth>
			) : (
				<Component {...pageProps} />
			)}
		</SessionProvider>
	);
}

export default MyApp;


function Auth({ children  }: AuthProps) {
	const { status } = useSession({ required: true });

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	return (
		<>
			{children}
		</>
	);
}

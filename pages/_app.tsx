import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AuthProps } from "next/app";
import Text from "../components/Typography/Text";
import Loader from "../components/Loader/Loader";
import LoadingPage from "../components/Loader/LoadingPage";

function MyApp({ Component, pageProps }) {
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

function Auth({ children }: AuthProps) {
	const { status } = useSession({ required: true });
	if (status === "loading") {
		return <LoadingPage />;
	}
	return <>{children}</>;
}

import Link from "next/link";
import { fetcher } from "../services/config";
import { path } from "../services/routes";
import Layout from "../components/Layout/Layout";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "../services/api/user";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Text from "../components/Typography/Text";

export default function Home({ single_type }) {
	/* 	const { data } = useSession();
	const jwt = data?.jwt;

	const { user, isLoading } = useCurrentUser(jwt);
	if (isLoading) return <Loader type='spin' height={20} width={20} />;

	console.log(user); */

	return <Layout title='Home'></Layout>;
}

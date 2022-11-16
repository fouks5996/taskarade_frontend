import Link from "next/link";
import { fetcher } from "../services/config";
import { path } from "../services/routes";
import Layout from "../components/Layout/Layout";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "../services/api/user";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Home({ single_type }) {
  const { data } = useSession();
  const jwt = data?.jwt;

  const { user, isLoading } = useCurrentUser(jwt);
  if (isLoading) return <Loader type="spin" height={20} width={20} />;

  return (
    <Layout title={single_type.data.attributes.meta_title.meta_title}>
      <div>
        <h1> {single_type.data.attributes.hero_content.title} </h1>
        <p> {single_type.data.attributes.hero_content.description} </p>
        <button> {single_type.data.attributes.hero_content.button} </button>
      </div>

      <p>{user.username}</p>
      <Link href="/blog"> go to blog </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const single_type = await fetcher(path("HP_single_type"));
  return {
    props: { single_type },
  };
}

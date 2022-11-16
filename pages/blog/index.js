import Link from "next/link";
import { fetcher } from "../../services/config";
import { path } from "../../services/routes";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import PostData from "../../components/Project/form";
import Project from "../../components/Project/Project";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "../../services/api/user";

export default function Blog() {
  const { data } = useSession();
  const jwt = data?.jwt;

  const { user, isLoading, mutate } = useCurrentUser(jwt);
  const [getId, setGetId] = useState(null);
  if (isLoading) return <Loader type="spin" height={20} width={20} />;

  return (
    <Layout title={"Blog"}>
      <h1>salut blog</h1>
      <Link href="/"> go to home </Link>
      <div>
        {user.posts?.map((post) => (
          <Project
            key={post.id}
            post={post}
            getId={getId}
            setGetId={setGetId}
            mutate={mutate}
          />
        ))}
      </div>
      <PostData mutate={mutate} user={user} />
    </Layout>
  );
}

export async function getStaticProps() {
  const single_type = await fetcher(path("BLOG_single_type"));
  return {
    props: { single_type },
  };
}

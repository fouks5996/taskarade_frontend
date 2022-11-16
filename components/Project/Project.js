import { useEffect, useState } from "react";
import { remove, update } from "../../services/config";
import { path } from "../../services/routes";
import { getSession, useSession } from "next-auth/react";
import Cookies from "js-cookie";

function Project({ post, getId, setGetId, mutate }) {
  const { data: session } = useSession();

  async function updateProject(e) {
    e.preventDefault();
    const body = {
      data: { title: e.target.project.value },
    };
    const { success } = await update(
      path("UPDATE_posts", post.id),
      body,
      session.jwt
    );

    if (success) {
      await mutate();
      setGetId(!post.id);
    } else {
      alert("erreur");
    }
  }
  return (
    <>
      {session ? (
        getId === post.id ? (
          <form onSubmit={updateProject}>
            <input
              name="project"
              className="italic"
              autoFocus={true}
              defaultValue={post.title}
              type="text"
            />
          </form>
        ) : (
          <div className={`cursor-pointer flex items-center gap-4`}>
            <p
              onDoubleClick={() => setGetId(post.id)}
              onClick={() => setGetId(!post.id)}
            >
              {post.title}
            </p>
            <p
              onClick={() =>
                remove(path("DELETE_posts", post.id), mutate, session.jwt)
              }
            >
              Delete
            </p>
          </div>
        )
      ) : (
        <p>{post.title}</p>
      )}
    </>
  );
}

export default Project;

import { post } from "../../services/config";
import { path } from "../../services/routes";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "../../services/api/user";
import Loader from "../Loader/Loader";

export default function PostData({ mutate, user }) {
  const { data } = useSession();
  const jwt = data?.jwt;

  async function addProject() {
    const { success } = await post(
      path("POST_posts"),
      {
        data: { title: "new project", user: user.id },
      },
      jwt
    );
    if (success) {
      console.log(success);
      await mutate();
    } else {
      alert("erreur lors de la création");
    }
  }
  return (
    <p className="cursor-pointer p-3" onClick={() => addProject()}>
      Ajouter un projet
    </p>
  );
}

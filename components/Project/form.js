import { post } from "../../services/config";
import { path } from "../../services/routes";
import { useSession } from "next-auth/react";

export default function PostData({ mutate, user }) {
	async function addProject() {
		const { success } = await post(path("POST_posts"), {
			data: { title: "new project", user: user.id },
		});
		if (success) {
			console.log(success);
			await mutate();
		} else {
			alert("erreur lors de la création");
		}
	}
	return (
		<p className='cursor-pointer p-3' onClick={() => addProject()}>
			Ajouter un projet
		</p>
	);
}

import { post } from "../config";
import { path } from "../routes";

export async function createNotification(
	body: object,
	senderID: number,
	recipientID: number,
	projectID: number,
	commentID: number,
	linkTo: string
) {
	const bodyNotif = {
		data: {
			body,
			sender: senderID,
			recipient: recipientID,
			project: projectID,
			comment: commentID,
			linkTo,
		},
	};

	const { success } = await post(path("CREATE_notif"), bodyNotif);

	return {
		ok: success,
	};
}

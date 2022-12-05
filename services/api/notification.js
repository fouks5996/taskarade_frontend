import { post } from "../config";
import { path } from "../routes";

export async function createNotification(
	body,
	sender,
	recipient,
	project,
	comment,
	linkTo
) {
	const bodyNotif = {
		data: {
			body,
			sender,
			recipient,
			project,
			comment,
			linkTo,
		},
	};

	const { success } = await post(path("CREATE_notif"), bodyNotif);

	return {
		ok: success,
	};
}

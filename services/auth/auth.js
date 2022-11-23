import { post } from "../config";
const strapiUrl = process.env.STRAPI_URL;

export async function signIn({ email, password }) {
	const res = await post(`${strapiUrl}/api/auth/local`, {
		identifier: email,
		password,
	});

	return res.success;
}

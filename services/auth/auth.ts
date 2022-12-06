import { post } from "../config";
const strapiUrl = process.env.STRAPI_URL;

export async function signIn({ email, password }: {email: string, password: string}) {
	const body = {
		identifier: email,
		password,
	}
	const res = await post(`${strapiUrl}/api/auth/local`, body);
	return res.success;
}

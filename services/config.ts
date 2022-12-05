export const getRoot = () => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
		return {
			API_URL: "http://localhost:1337",
			FRONT_URL: "http://localhost:3000",
		};
	} else {
		return {
			API_URL: "https://strapi-7t0n.onrender.com",
			FRONT_URL: "https://taskarade-frontend.vercel.app",
		};
	}
};

let jwt: string = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export async function fetcher(url: string, options = {}) {
	let response: any;
	if (!options) {
		response = await fetch(url);
	} else {
		response = await fetch(url, options);
	}
	const data = await response.json();
	return data;
}

export async function currentFetcher(url: string) {
	let response = await fetch(url, {
		method: "GET",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
	});
	const data = await response.json();
	return data;
}

export async function post(url: string, body: object) {
	let res: any;
	if (jwt !== null) {
		res = await fetcher(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(body),
		});
	} else {
		res = await fetcher(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(body),
		});
	}

	return {
		success: res,
		error: res.error,
	};
}

export async function update(url: string, body: object) {
	let res = await fetcher(url, {
		method: "PUT",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(body),
	});

	return {
		success: res,
		error: res.error,
	};
}

export async function remove(url: string, mutate: () => any) {
	let res = await fetcher(url, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
	});
	mutate && (await mutate());
	return res;
}

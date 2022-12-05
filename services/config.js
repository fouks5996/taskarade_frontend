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

export async function fetcher(url, options = {}) {
	let response;

	if (!options) {
		response = await fetch(url);
	} else {
		response = await fetch(url, options);
	}
	const data = await response.json();
	return data;
}

export async function currentFetcher(url) {
	let jwt = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
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

export async function post(url, body) {
	let jwt = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
	let res;
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

export async function update(url, body) {
	let jwt = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
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

export async function remove(url, mutate) {
	let jwt = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
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

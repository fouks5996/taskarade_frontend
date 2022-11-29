export const getRoot = () => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
		return {
			API_URL: "http://localhost:1337",
			FRONT_URL: "http://localhost:3000",
		};
	} else {
		return {
			API_URL: "https://strapi-3rnl.onrender.com",
			FRONT_URL: "",
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

export async function currentFetcher(url, jwt) {
	let response = await fetch(url, {
		headers: { authorization: `Bearer ${jwt}` },
	});

	const data = await response.json();
	return data;
}

export async function post(url, body, jwt = null) {
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

export async function update(url, body, jwt) {
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

export async function remove(url, mutate, jwt) {
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

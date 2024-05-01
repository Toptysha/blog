export const request = (url, method, data) => {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((response) => response.json());
};

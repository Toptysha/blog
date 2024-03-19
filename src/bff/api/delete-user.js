export const deleteUser = (userId) =>
	fetch(`http://localhost:3005/users/${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

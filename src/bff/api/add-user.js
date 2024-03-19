import { dateGenerator } from '../utils';

export const addUser = (regLogin, regPassword) =>
	fetch(`http://localhost:3005/users`, {
		method: 'POST',
		body: JSON.stringify({
			login: regLogin,
			password: regPassword,
			registered_at: dateGenerator(),
			role_id: 2,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	}).then((createdUser) => createdUser.json());

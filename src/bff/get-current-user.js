import { getUsers } from './get-users';

export const getCurrentUser = async (login) => {
	const users = await getUsers();

	return users.find((user) => user.login === login);
};

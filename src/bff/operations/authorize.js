import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const currentUser = await getUser(authLogin);

	if (!currentUser) {
		return {
			error: 'Логин не найден',
			res: null,
		};
	}

	const { id, login, password, roleId } = currentUser;

	if (password !== authPassword) {
		return {
			error: 'Неверный пароль',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session: sessions.create(currentUser),
		},
	};
};

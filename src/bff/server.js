import { addUser } from './add-user';
import { getCurrentUser } from './get-current-user';
import { sessions } from './sessions';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},
	async authorize(login, password) {
		const currentUser = await getCurrentUser(login);

		if (!currentUser) {
			return {
				error: 'Логин не найден',
				res: null,
			};
		}

		if (currentUser.password !== password) {
			return {
				error: 'Неверный пароль',
				res: null,
			};
		}

		return {
			error: null,
			res: {
				id: currentUser.id,
				login: currentUser.login,
				roleId: currentUser.role_id,
				session: sessions.create(currentUser),
			},
		};
	},
	async register(regLogin, regPassword) {
		const duplicateUser = await getCurrentUser(regLogin);

		if (!duplicateUser) {
			return {
				error: 'Логин уже используется',
				res: null,
			};
		}

		await addUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: duplicateUser.id,
				login: duplicateUser.login,
				roleId: duplicateUser.role_id,
				session: sessions.create(duplicateUser),
			},
		};
	},
};

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
		const existedUser = await getCurrentUser(regLogin);

		if (existedUser) {
			return {
				error: 'Логин уже используется',
				res: null,
			};
		}

		const user = await addUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};

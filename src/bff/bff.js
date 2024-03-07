import { ROLE } from '../constants';
import { addUser } from './add-user';
import { createSession } from './create-session';
import { getCurrentUser } from './get-current-user';

export const server = {
	async authorize(login, password) {
		const currentUser = await getCurrentUser(login);

		if (!currentUser) {
			return {
				error: 'This login was not found',
				res: null,
			};
		}

		if (currentUser.password !== password) {
			return {
				error: 'Password are not correctly',
				res: null,
			};
		}

		return {
			error: null,
			res: createSession(currentUser.role_id),
		};
	},
	async register(regLogin, regPassword) {
		const duplicateUser = await getCurrentUser(regLogin);

		if (!duplicateUser) {
			return {
				error: 'This login is already taken',
				res: null,
			};
		}

		await addUser(regLogin, regPassword);

		return {
			error: null,
			res: createSession(ROLE.READER),
		};
	},
};

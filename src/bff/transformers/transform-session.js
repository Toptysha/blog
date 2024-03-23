export const transformSession = (dbSession) => ({
	id: dbSession.id,
	hash: dbSession.hash,
	user: {
		id: dbSession.user.id,
		login: dbSession.user.login,
		password: dbSession.user.password,
		registeredAt: dbSession.user.registeredAt,
		roleId: dbSession.user.roleId,
	},
});

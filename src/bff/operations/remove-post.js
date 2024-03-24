import { deleteComment, deletePost, getComments } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (hash, postId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.checkAccess(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deletePost(postId);

	const comments = await getComments(postId);

	await comments.forEach((comment) => deleteComment(comment.id));

	// await Promise.all(comments.map((comment) => deleteComment(comment.id)));

	// await deleteComment(commentId);

	return {
		error: null,
		res: true,
	};
};

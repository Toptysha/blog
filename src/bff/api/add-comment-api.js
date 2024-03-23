import { dateGenerator } from '../utils';

export const addCommentApi = (postId, userId, content) =>
	fetch(`http://localhost:3005/comments`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			published_at: dateGenerator(),
			content,
		}),
	});

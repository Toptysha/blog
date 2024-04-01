import { transformComments } from '../transformers/transform-comments';

export const getComments = (postId) => {
	const ALL_COMMENTS_URL = `http://localhost:3005/comments`;
	const POST_COMMENTS_URL = `http://localhost:3005/comments?post_id=${postId}`;

	const url = postId === undefined ? ALL_COMMENTS_URL : POST_COMMENTS_URL;

	return fetch(url)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments && loadedComments.map((comment) => transformComments(comment)));
};

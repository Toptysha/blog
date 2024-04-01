import { transformPost } from '../transformers';

export const getPosts = async (page, limit) => {
	const [loadedPostsOnPagePromise, loadedAllPostsPromise] = await Promise.all([
		fetch(`http://localhost:3005/posts?_page=${page}&_per_page=${limit}`),
		fetch(`http://localhost:3005/posts`),
	]).then(([loadedPostsOnPageResponse, loadedAllPostsResponse]) => {
		return [loadedPostsOnPageResponse.json(), loadedAllPostsResponse.json()];
	});

	const posts = await loadedPostsOnPagePromise.then((loadedPostsOnPage) => loadedPostsOnPage && loadedPostsOnPage.data.map((loadedPost) => transformPost(loadedPost)));
	const lastPage = await loadedAllPostsPromise.then((loadedAllPosts) => Math.ceil(loadedAllPosts.length / 6));

	return { posts, lastPage };
};

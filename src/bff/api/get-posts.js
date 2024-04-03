import { transformPost } from '../transformers';

export const getPosts = async (searchPhrase, page, limit) => {
	const loadedAllPostsPromise = fetch(`http://localhost:3005/posts`).then((loadedAllPostsResponse) => loadedAllPostsResponse.json());

	const allPosts = await loadedAllPostsPromise.then((loadedAllPosts) => loadedAllPosts && loadedAllPosts.map((loadedPost) => transformPost(loadedPost)));
	let posts = allPosts;

	let lastPage = Math.ceil(posts.length / limit);

	const sortedPosts = [];

	if (searchPhrase !== '') {
		posts.forEach((post) => {
			if (post.title.includes(searchPhrase)) {
				sortedPosts.push(post);
			}
		});
		posts = sortedPosts;
		lastPage = Math.ceil(posts.length / limit);
	}

	let currentPosts = [];

	posts.forEach((post, i) => {
		if (i >= page * limit - limit && i < page * limit) {
			currentPosts.push(post);
		}
	});

	if (!(currentPosts.length === 0 && sortedPosts.length !== 0)) {
		posts = currentPosts;
	}

	return { posts, lastPage };
};

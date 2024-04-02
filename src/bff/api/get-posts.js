import { transformPost } from '../transformers';

// export const getPosts = async (searchPhrase, page, limit) => {
// 	const [loadedPostsOnPagePromise, loadedAllPostsPromise] = await Promise.all([
// 		fetch(`http://localhost:3005/posts?_page=${page}&_per_page=${limit}`),
// 		fetch(`http://localhost:3005/posts`),
// 	]).then(([loadedPostsOnPageResponse, loadedAllPostsResponse]) => {
// 		return [loadedPostsOnPageResponse.json(), loadedAllPostsResponse.json()];
// 	});

// 	let posts = await loadedPostsOnPagePromise.then((loadedPostsOnPage) => loadedPostsOnPage && loadedPostsOnPage.data.map((loadedPost) => transformPost(loadedPost)));
// 	const allPosts = await loadedAllPostsPromise.then((loadedAllPosts) => loadedAllPosts && loadedAllPosts.map((loadedPost) => transformPost(loadedPost)));
// 	let lastPage = Math.ceil(allPosts.length / 6);

// 	const sortedPosts = [];

// 	if (searchPhrase !== '') {
// 		allPosts.forEach((post) => {
// 			if (post.title.includes(searchPhrase)) {
// 				sortedPosts.push(post);
// 			}
// 		});
// 		posts = sortedPosts;
// 		lastPage = Math.ceil(posts.length / 6);
// 	}

// 	console.log(posts, lastPage);

// 	return { posts, lastPage };
// };

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

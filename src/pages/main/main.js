import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard } from './components';
import { PAGINATION_LIMIT } from '../../bff/constants';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then((postsFromDb) => {
			setPosts(postsFromDb.res.posts);
			setLastPage(postsFromDb.res.lastPage);
		});
	}, [requestServer, page]);

	return (
		<div className={className}>
			<div className="postList">
				{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
					<PostCard key={id} id={id} title={title} imageUrl={imageUrl} publishedAt={publishedAt} commentsCount={commentsCount} />
				))}
			</div>
			{lastPage > 1 && <Pagination page={page} setPage={setPage} lastPage={lastPage} />}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .postList {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px;
	}
`;

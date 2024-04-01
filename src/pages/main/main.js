import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts').then((postsFromDb) => {
			setPosts(postsFromDb.res);
		});
	}, []);

	return (
		<div className={className}>
			<div className="postList">
				{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
					<PostCard key={id} id={id} title={title} imageUrl={imageUrl} publishedAt={publishedAt} commentsCount={commentsCount} />
				))}
			</div>
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
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../bff/constants';
import { debounce } from './utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then((postsFromDb) => {
			setPosts(postsFromDb.res.posts);
			setLastPage(postsFromDb.res.lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="postsAndSearch">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				<div className="postList">
					{posts.length === 0 ? (
						<div className="noPostsFound">Статьи не найдены!</div>
					) : (
						posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
							<PostCard key={id} id={id} title={title} imageUrl={imageUrl} publishedAt={publishedAt} commentsCount={commentsCount} />
						))
					)}
				</div>
			</div>
			{lastPage > 1 && <Pagination page={page} setPage={setPage} lastPage={lastPage} />}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	height: 655px;
	position: relative;

	& .postList {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px;
	}

	& .noPostsFound {
		width: 100%;
		text-align: center;
		font-size: 22px;
	}
`;

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination, PostCard, Search } from './components';
import { debounce } from './utils';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [lastPage, setLastPage] = useState(1);

	const PAGINATION_LIMIT = 6;

	useEffect(() => {
		request(`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

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
						posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
							<PostCard key={id} id={id} title={title} imageUrl={imageUrl} publishedAt={publishedAt} commentsCount={comments.length} />
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

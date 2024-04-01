import styled from 'styled-components';
import { Button } from '../../../components';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="currentPage">Страница: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 0px 0 20px;
	padding: 0 20px;

	& button {
		margin: 0 20px;
	}

	& .currentPage {
		padding-top: 2px;
		border: 1px solid #000;
		border-radius: 5px;
		width: 100%;
		margin: 0 20px;
		font-size: 17px;
		font-weight: 500;
	}
`;

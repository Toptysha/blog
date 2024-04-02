import styled from 'styled-components';
import { Icon, Input } from '../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} onChange={onChange} placeholder="Поиск..." />
			<Icon id="fa-search" size="20px" margin="5px 10px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	width: 320px;
	height: 40px;
	margin: 40px auto 0;
	border: 1px solid #000;
	border-radius: 5px;

	& input {
		border: none;
		outline: none;
		height: 100%;
	}
`;

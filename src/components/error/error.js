import styled from 'styled-components';
import { H2 } from '../../components';

const ErrorContainer = ({ className, error }) =>
	error && (
		<div className={className}>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</div>
	);

export const Error = styled(ErrorContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

import styled from 'styled-components';

const IconContainer = ({ className, id, onClick }) => (
	<div className={className}>
		<i className={`fa ${id}`} aria-hidden="true" onClick={onClick} />
	</div>
);

export const Icon = styled(IconContainer)`
	cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled = false }) => (disabled ? '#ccc' : '#000')};
`;

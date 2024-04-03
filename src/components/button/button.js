import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ children, className, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(ButtonContainer)`
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	border-radius: 5px;
	font-size: 18px;
	width: 100%;
	height: 32px;
	background: #eee;
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
};

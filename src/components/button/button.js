import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(ButtonContainer)`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	border-radius: 5px;
	font-size: 18px;
	${'' /* width: ${(width = '100%') => width}; */}
	width: 100%;
	height: 32px;
	background: #eee;
`;

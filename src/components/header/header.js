import styled from 'styled-components';
import { Logo, Description, ControlPanel } from './components';

export const HeaderComponent = ({ className }) => {
	return (
		<div className={className}>
			<Logo />
			<Description />
			<ControlPanel />
		</div>
	);
};

export const Header = styled(HeaderComponent)`
	display: flex;
	justify-content: space-between;
	background: #fff;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 -2px 16px #000;
`;

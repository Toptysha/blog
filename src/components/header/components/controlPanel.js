import styled from 'styled-components';
import { Icon } from '../../icon';
import { Link, useNavigate } from 'react-router-dom';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	border-radius: 5px;
	font-size: 18px;
	width: 100px;
	height: 32px;
	font-style: normal;
	background: #eee;
`;

const BackButton = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const nav = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to="/login">Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<BackButton onClick={() => nav(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />{' '}
				</BackButton>
				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 16px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	font-style: italic;
`;

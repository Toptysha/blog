import styled from 'styled-components';
import { Icon, Button } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../redux/selectors';
import { logout } from '../../../redux/actions/logout';

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	margin-right: 10px;
`;

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const BackButton = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const nav = useNavigate();

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button width="300px">
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<BackButton onClick={() => dispatch(logout(session))}>
							<Icon id="fa-sign-out" margin="0" />
						</BackButton>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<BackButton onClick={() => nav(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
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

export const ControlPanel = styled(ControlPanelContainer)``;

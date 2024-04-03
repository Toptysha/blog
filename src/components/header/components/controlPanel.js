import styled from 'styled-components';
import { Icon, Button } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../redux/selectors';
import { logout } from '../../../redux/actions/logout';
import { RESET_POST_DATA } from '../../../redux/actions';
import { checkAccess } from '../../../utils';

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

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	const onCreatePost = () => {
		dispatch(RESET_POST_DATA);
		navigate('/post');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin="0" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" size="20px" onClick={() => navigate(-1)} />
				{isAdmin && (
					<>
						<Icon id="fa-file-text-o" margin="10px 0 0 14px" size="20px" onClick={onCreatePost} />
						<Icon id="fa-users" margin="10px 0 0 14px" size="20px" onClick={() => navigate('/users')} />
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	& button {
		width: 90px;
	}
`;

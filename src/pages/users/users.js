import styled from 'styled-components';
import { H2, PrivateContent } from '../../components';
import { UserRow } from './components';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../redux/selectors';
import { request } from '../../utils/request';

const TableHeader = styled.div`
	display: flex;
	padding: 5px;
	width: 500px;
	margin: auto;
`;

const Login = styled.div`
	margin-right: 100px;
`;
const RegisterAt = styled.div`
	margin-right: 100px;
`;

const UsersComponent = ({ className }) => {
	const userRole = useSelector(selectUserRole);

	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([request(`/users`), request(`/users/roles`)]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.data);
			setRoles(rolesRes.data);
		});
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableHeader>
						<Login>Логин</Login>
						<RegisterAt>Дата регистрации</RegisterAt>
						<div>Роль</div>
					</TableHeader>
					{users.map(({ id, login, registeredAt, roleId }) => {
						return (
							<UserRow
								key={id}
								id={id}
								login={login}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
								onUserRemove={() => onUserRemove(id)}
							/>
						);
					})}
				</div>
			</PrivateContent>
		</div>
	);
};

export const Users = styled(UsersComponent)``;

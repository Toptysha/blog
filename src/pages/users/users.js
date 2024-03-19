import styled from 'styled-components';
import { Content, H2 } from '../../components';
import { UserRow } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';

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
	const requestServer = useServerRequest();

	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [requestServer, shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
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
			</Content>
		</div>
	);
};

export const Users = styled(UsersComponent)`
	${'' /* background: red; */}
`;

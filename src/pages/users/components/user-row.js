import PropTypes from 'prop-types';
import { Icon } from '../../../components';
import { useState } from 'react';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../constants';
import { request } from '../../../utils/request';

const UserData = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	padding: 4px 7px;
	width: 500px;
	border: 1px solid black;
	border-radius: 5px;
`;

const Login = styled.div``;
const RegisteredAt = styled.div`
	margin-right: 48px;
`;
const RoleDiv = styled.div`
	display: flex;
`;
const RoleSelect = styled.select`
	margin-top: 0px;
	height: 20px;
`;

const SaveUserIcon = styled(Icon)`
	font-size: 16px;
`;

const DeleteUserIcon = styled(Icon)`
	font-size: 16px;
	margin-top: 14px;
`;

const UserRowComponent = ({ className, id, login, registeredAt, roleId: userRoleId, roles, onUserRemove }) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onUserRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => setInitialRoleId(newUserRoleId));
	};

	return (
		<div className={className}>
			<UserData>
				<Login>{login}</Login>
				<RoleDiv>
					<RegisteredAt>{registeredAt}</RegisteredAt>
					<RoleSelect value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option value={roleId} key={roleId}>
								{roleName}
							</option>
						))}
					</RoleSelect>
					<SaveUserIcon id="fa-save" margin="0px 0 0 10px" onClick={() => onUserRoleSave(id, selectedRoleId)} disabled={isSaveButtonDisabled} />
				</RoleDiv>
			</UserData>
			<DeleteUserIcon id="fa-trash-o" margin="0px 0 0 10px" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowComponent)`
	display: flex;
	width: 500px;
	margin: auto;
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	onUserRemove: PropTypes.func.isRequired,
};

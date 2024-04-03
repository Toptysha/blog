import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../redux/actions';
import { useServerRequest } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../redux/selectors';
import styled from 'styled-components';

const SpecialPanelContent = styled.div`
	display: flex;
	align-items: center;
`;

const SpecialPanelComponent = ({ className, postId, publishedAt, specialIcon }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = (requestServer, postId) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, postId)).then(() => navigate(`/`));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<SpecialPanelContent>
				{publishedAt && <Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />}
				{publishedAt}
			</SpecialPanelContent>
			{isAdmin && (
				<SpecialPanelContent>
					{specialIcon}
					{publishedAt && <Icon id="fa-trash-o" size="18px" margin="0 0 0 15px" onClick={() => onPostRemove(requestServer, postId)} />}
				</SpecialPanelContent>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelComponent)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${({ margin = '10px 0 20px 0' }) => margin};
`;

SpecialPanel.propTypes = {
	postId: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	specialIcon: PropTypes.node.isRequired,
};

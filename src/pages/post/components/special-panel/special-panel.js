import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../redux/actions';
import { useServerRequest } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';

const SpecialPanelContent = styled.div`
	display: flex;
	align-items: center;
`;

const SpecialPanelComponent = ({ className, postId, publishedAt, specialIcon }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

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

	return (
		<div className={className}>
			<SpecialPanelContent>
				{publishedAt && <Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />}
				{publishedAt}
			</SpecialPanelContent>
			<SpecialPanelContent>
				{specialIcon}
				{publishedAt && <Icon id="fa-trash-o" size="18px" margin="0 0 0 15px" onClick={() => onPostRemove(requestServer, postId)} />}
			</SpecialPanelContent>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelComponent)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${({ margin = '10px 0 20px 0' }) => margin};
`;

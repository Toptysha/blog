import PropTypes from 'prop-types';
import { Icon } from '../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { removeCommentAsync, CLOSE_MODAL, openModal } from '../../../../../redux/actions';
import { checkAccess } from '../../../../../utils';
import { ROLE } from '../../../../../constants';
import { selectUserRole } from '../../../../../redux/selectors';
import styled from 'styled-components';

const CommentBlock = styled.div`
	width: 100%;
	border: 1px solid black;
	border-radius: 5px;
	padding: 5px;

	& .commentInfo {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	& .authorPublishedAt {
		display: flex;
	}

	& .defaultCursor {
		cursor: default;
	}
`;

const CommentComponent = ({ className, postId, commentId, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (postId, commentId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, commentId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isModeratorOrAdmin = checkAccess([ROLE.MODERATOR, ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<CommentBlock>
				<div className="commentInfo">
					<div className="authorPublishedAt">
						<Icon className="defaultCursor" id="fa-user-circle-o" size="18px" margin="0 10px 0px 0px" />
						{author}
					</div>
					<div className="authorPublishedAt">
						<Icon className="defaultCursor" id="fa-calendar-o" size="18px" margin="0 10px 0px 0px" />
						{publishedAt}
					</div>
				</div>
				<div>{content}</div>
			</CommentBlock>

			{isModeratorOrAdmin ? <Icon id="fa-trash-o" size="18px" margin="0 0px 0px 10px" onClick={() => onCommentRemove(postId, commentId)} /> : <div className="empty"></div>}
		</div>
	);
};

export const Comment = styled(CommentComponent)`
	display: flex;
	width: 580px;
	margin: 20px auto;

	& .empty {
		width: 30px;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	commentId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};

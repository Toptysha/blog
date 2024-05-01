import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../redux/selectors';
import { addCommentAsync } from '../../../../redux/actions';
import { checkAccess } from '../../../../utils';
import { PROP_TYPE, ROLE } from '../../../../constants';
import styled from 'styled-components';

const NewComment = styled.div`
	width: 100%;
	display: flex;
	& textarea {
		padding: 5px;
		width: 100%;
		height: 120px;
		font-size: 16px;
		resize: none;
		border: 1px solid black;
		border-radius: 5px;
	}
`;

const CommentsList = styled.div``;

const CommentsComponent = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');

	const dispatch = useDispatch();

	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isNotGuest = !checkAccess([ROLE.GUEST], userRole);

	return (
		<div className={className}>
			{isNotGuest && (
				<NewComment>
					<textarea name="comment" value={newComment} placeholder="Комментарий..." onChange={({ target }) => setNewComment(target.value)} />
					<Icon id="fa-paper-plane-o" size="18px" margin="0 0px 0px 10px" onClick={() => onNewCommentAdd(postId, newComment)} />
				</NewComment>
			)}
			<CommentsList>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment key={id} postId={postId} commentId={id} author={author} content={content} publishedAt={publishedAt} />
				))}
			</CommentsList>
		</div>
	);
};

export const Comments = styled(CommentsComponent)`
	width: 580px;
	margin: 20px auto;
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};

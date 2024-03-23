import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../../redux/selectors';
import { addCommentAsync } from '../../../../redux/actions';
import { useServerRequest } from '../../../../hooks';

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

	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (requestServer, postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			<NewComment>
				<textarea name="comment" value={newComment} placeholder="Комментарий..." onChange={({ target }) => setNewComment(target.value)} />
				<Icon id="fa-paper-plane-o" size="18px" margin="0 0px 0px 10px" onClick={() => onNewCommentAdd(requestServer, postId, userId, newComment)} />
			</NewComment>
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

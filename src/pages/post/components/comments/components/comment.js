import styled from 'styled-components';
import { Icon } from '../../../../../components';

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

const CommentComponent = ({ className, id, author, content, publishedAt }) => {
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

			<Icon id="fa-trash-o" size="18px" margin="0 0px 0px 10px" />
		</div>
	);
};

export const Comment = styled(CommentComponent)`
	display: flex;
	width: 580px;
	margin: 20px auto;
`;

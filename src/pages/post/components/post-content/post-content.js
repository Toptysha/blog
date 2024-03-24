import styled from 'styled-components';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';

const Content = styled.div`
	font-size: 18px;
	white-space: pre-line;
`;

const PostContentComponent = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				margin="-20px 0 20px 0"
				postId={id}
				publishedAt={publishedAt}
				specialIcon={<Icon id="fa-pencil-square-o" size="18px" margin="0 15px 0 0" onClick={() => navigate(`/post/${id}/edit`)} />}
			/>
			<Content>{content}</Content>
		</div>
	);
};

export const PostContent = styled(PostContentComponent)`
	& img {
		float: left;
		margin: 0 10px 6px 0;
	}
`;

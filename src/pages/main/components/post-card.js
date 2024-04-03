import PropTypes from 'prop-types';
import { Icon } from '../../../components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCardContainer = ({ className, id, title, imageUrl, publishedAt, commentsCount }) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="postCardFooter">
					<h4>{title}</h4>
					<div className="postCardInfo">
						<div className="publishedAt">
							<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
							{publishedAt}
						</div>
						<div className="commentsCount">
							<Icon id="fa-comment-o" size="18px" margin="0 10px 0 0" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& img {
		width: 100%;
		border-bottom: 1px solid #000;
	}

	& .postCardInfo {
		display: flex;
		justify-content: space-between;
	}

	& .publishedAt,
	.commentsCount {
		display: flex;
		padding: 5px;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};

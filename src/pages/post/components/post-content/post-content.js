import styled from 'styled-components';
import { H2, Icon } from '../../../../components';

const SpecialPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 18px;
`;

const SpecialPanelContent = styled.div`
	display: flex;
	align-items: center;
	margin: -20px 0 20px 0;
	font-size: 18px;
`;

const Content = styled.div`
	font-size: 18px;
`;

const PostContentComponent = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel>
				<SpecialPanelContent>
					<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
					{publishedAt}
				</SpecialPanelContent>
				<SpecialPanelContent>
					<Icon id="fa-pencil-square-o" size="18px" margin="0 15px 0 0" />
					<Icon id="fa-trash-o" size="18px" />
				</SpecialPanelContent>
			</SpecialPanel>
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

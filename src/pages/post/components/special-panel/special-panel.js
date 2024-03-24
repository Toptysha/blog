import styled from 'styled-components';
import { Icon } from '../../../../components';

const SpecialPanelContent = styled.div`
	display: flex;
	align-items: center;
	${'' /* margin: 10px 0 20px 0; */}
`;

const SpecialPanelComponent = ({ className, publishedAt, specialIcon }) => {
	return (
		<div className={className}>
			<SpecialPanelContent>
				<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
				{publishedAt}
			</SpecialPanelContent>
			<SpecialPanelContent>
				{specialIcon}
				{/* <Icon id="fa-floppy-o" size="18px" margin="0 15px 0 0" /> */}
				<Icon id="fa-trash-o" size="18px" />
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

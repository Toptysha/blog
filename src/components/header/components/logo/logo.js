import styled from 'styled-components';
import { Icon } from '../../../icon';
import { Link } from 'react-router-dom';

const LargeText = styled.div`
	font-size: 46px;
	font-weight: 600;
	line-height: 34px;
	margin: 18px 0 0 10px;
`;

const SmallText = styled.div`
	font-size: 22px;
	font-weight: bold;
	margin: 0 0 0 10px;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="70px" margin="0 10px 0 0" />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>веб-разработчика</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;

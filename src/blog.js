import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Footer } from './components';
import { Authorization, Registration } from './pages';

const Content = styled.div`
	padding: 120px 0;
	text-align: center;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

export const Blog = () => {
	return (
		<>
			<AppColumn>
				<Header />
				<Content>
					<Routes>
						<Route path="/" element={<div>Main Page!</div>} />
						<Route path="/login" element={<Authorization />} />
						<Route path="/register" element={<Registration />} />
						<Route path="/users" element={<div>Users Page!</div>} />
						<Route path="/post" element={<div>New Post Page!</div>} />
						<Route path="/post/:postId" element={<div>Post Page!</div>} />
						<Route path="*" element={<div>ERROR!</div>} />
					</Routes>
				</Content>
				<Footer />
			</AppColumn>
		</>
	);
};

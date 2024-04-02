import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Footer, Modal } from './components';
import { Authorization, Main, Post, Registration, Users } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions';

const Page = styled.div`
	padding: 120px 0 20px;
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
	${'' /* position: relative; */}
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserData = JSON.parse(sessionStorage.getItem('userData'));

		if (!currentUserData) {
			return;
		}

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
	}, [dispatch]);

	return (
		<>
			<AppColumn>
				<Header />
				<Page>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/login" element={<Authorization />} />
						<Route path="/register" element={<Registration />} />
						<Route path="/users" element={<Users />} />
						<Route path="/post" element={<Post />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/post/:id/edit" element={<Post />} />
						{/* <Route path="/post/:id/*" element={<div>ERROR!</div>} /> */}
						<Route path="*" element={<div>ERROR!</div>} />
					</Routes>
				</Page>
				<Footer />
				<Modal />
			</AppColumn>
		</>
	);
};

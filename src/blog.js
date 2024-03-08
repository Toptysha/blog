import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
	padding: 120px 0;
	text-align: center;
`;

const H2 = styled.h2`
	padding: 120px 0;
`;

export const Header = () => {
	return <div>HEADER</div>;
};

export const Footer = () => {
	return <div>FOOTER</div>;
};

export const Blog = () => {
	return (
		<>
			<Header />
			<Content>
				<H2>Hello!</H2>
				<i className="fa fa-american-sign-language-interpreting fa-4x"></i>
				<Routes>
					<Route path="/" element={<div>Main Page!</div>} />
					<Route path="/login" element={<div>Login Page!</div>} />
					<Route path="/register" element={<div>Register Page!</div>} />
					<Route path="/users" element={<div>Users Page!</div>} />
					<Route path="/post" element={<div>New Post Page!</div>} />
					<Route path="/post/:postId" element={<div>Post Page!</div>} />
					<Route path="*" element={<div>ERROR!</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	);
};

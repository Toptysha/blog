import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

function App() {
	return (
		<div className="App">
			<Div>
				<h1>Hello!</h1>
				<i className="fa fa-american-sign-language-interpreting fa-4x"></i>
			</Div>
		</div>
	);
}

export default App;

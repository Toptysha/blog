import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterComponent = ({ className }) => {
	const [weather, setWeather] = useState({ city: '', temperature: '', description: '' });

	const date = new Date().toLocaleString('ru', { day: 'numeric', month: 'long' });

	useEffect(() => {
		fetch('https://api.openweathermap.org/data/2.5/weather?q=Voronezh&units=metric&lang=ru&appid=f31dccbbf76db01aa53fa288ccd48471')
			.then((res) => res.json())
			.then(({ name, main, weather }) => setWeather({ city: name, temperature: Math.round(main.temp), description: weather[0].description }));
	}, []);

	return (
		<div className={className}>
			<div>
				Блог веб-разработчика <br /> web@developer.ru
			</div>
			<div>
				{date}
				<br />
				{`В городе ${weather.city} сейчас ${weather.description}, t ${weather.temperature}°`}
			</div>
		</div>
	);
};

export const Footer = styled(FooterComponent)`
	display: flex;
	justify-content: space-between;
	background: #fff;
	font-weight: bold;
    bottom: 0;
	width: 1000px;
	height: 120px;
	padding: 40px 40px;
	box-shadow: 0 2px 16px #000; */
`;

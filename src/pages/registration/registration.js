import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useState } from 'react';
import { AuthFormError, Button, H2, Input } from '../../components';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
import { selectUserRole } from '../../redux/selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';

const regFormScheme = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверныо заполнен логин. Минимум 3 символа')
		.max(20, 'Неверныо заполнен логин. Максимум 20 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %')
		.min(6, 'Неверныо заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверныо заполнен пароль. Максимум 30 символов'),
	passCheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), null], 'пароли не совпадают'),
});

const RegistrationComponent = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passCheck: '',
		},
		resolver: yupResolver(regFormScheme),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message || errors?.passCheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type="text" placeholder="Логин..." {...register('login', { onChange: () => setServerError(null) })} />
				<Input type="password" placeholder="Пароль..." {...register('password', { onChange: () => setServerError(null) })} />
				<Input type="password" placeholder="Повторите пароль..." {...register('passCheck', { onChange: () => setServerError(null) })} />
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationComponent)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;

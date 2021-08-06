import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { iniciarSesion, mostrarAlerta } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
	const autenticado = useSelector((state) => state.autenticado);
	const mensaje = useSelector((state) => state.mensaje);
	const alerta = useSelector((state) => state.alerta);

	const history = useHistory();

	const dispatch = useDispatch();
	console.log(autenticado);
	// En caso de que el password o usuario no exista
	useEffect(() => {
		if (autenticado) {
			history.push('/proyectos');
			
		}

		if (mensaje) {
			dispatch(mostrarAlerta(mensaje.msg, mensaje.categoria));
		}
		// eslint-disable-next-line
	}, [mensaje, autenticado]);

	// State para iniciar sesión
	const [usuario, guardarUsuario] = useState({
		email: '',
		password: '',
	});

	// extraer de usuario
	const { email, password } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	// Cuando el usuario quiere iniciar sesión
	const onSubmit = (e) => {
		e.preventDefault();

		// Validar que no haya campos vacios
		if (email.trim() === '' || password.trim() === '') {
			dispatch(
				mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
			);
		}
		dispatch(iniciarSesion({ email, password }));
	};

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
			) : null}

			<div className='contenedor-form sombra-dark'>
				<h1>Iniciar Sesión</h1>

				<form onSubmit={onSubmit}>
					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Tu Email'
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Tu Password'
							value={password}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Iniciar Sesión'
						/>
					</div>
				</form>

				<Link to={'/nueva-cuenta'} className='enlace-cuenta'>
					Obtener Cuenta
				</Link>
			</div>
		</div>
	);
};

export default Login;

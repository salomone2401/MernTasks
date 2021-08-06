import {
	MOSTRAR_ALERTA,
	OCULTAR_ALERTA,
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	PROYECTO_ERROR,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

export const mostrarAlerta = (msg, categoria) => {
	return async (dispatch) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				categoria,
			},
		});

		// Después de 5 segundos limpiar la alerta
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 5000);
	};
};

export const registrarUsuario = (datos) => {
	return async (dispatch) => {
		try {
			const respuesta = await clienteAxios.post('/api/usuarios', datos);
			console.log(respuesta.data);

			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data,
			});

			// Obtener el usuario
			usuarioAutenticado();
		} catch (error) {
			// console.log(error.response.data.msg);
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error',
			};

			dispatch({
				type: REGISTRO_ERROR,
				payload: alerta,
			});
		}
	};
};

// Retorna el usuario autenticado
export const usuarioAutenticado = () => {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		if (token) {
			tokenAuth(token);
		}

		try {
			const respuesta = await clienteAxios.get('/api/auth');
			// console.log(respuesta);
			dispatch({
				type: OBTENER_USUARIO,
				payload: respuesta.data.usuario,
			});
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: LOGIN_ERROR,
			});
		}
	};
};

// Cuando el usuario inicia sesión
export const iniciarSesion = (datos) => {
	return async (dispatch) => {
		try {
			const respuesta = await clienteAxios.post('/api/auth', datos);
			console.log(respuesta);
			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,
			});

			// Obtener el usuario
			usuarioAutenticado();
		} catch (error) {
			console.log(error.response.data.msg);
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error',
			};

			dispatch({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
	};
};

// Cierra la sesión del usuario
export const cerrarSesion = () => {
	return async (dispatch) => {
		dispatch({
			type: CERRAR_SESION,
		});
	};
};

export const mostrarFormulario = () => {
	return async (dispatch) => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};
};

// Obtener los proyectos
export const obtenerProyectos = () => {
	return async (dispatch) => {
		try {
			const resultado = await clienteAxios.get('/api/proyectos');

			dispatch({
				type: OBTENER_PROYECTOS,
				payload: resultado.data.proyectos,
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};
};

// Agregar nuevo proyecto
export const agregarProyecto = (proyecto) => {
	return async (dispatch) => {
		try {
			const resultado = await clienteAxios.post('/api/proyectos', proyecto);
			console.log(resultado);
			// Insertar el proyecto en el state
			dispatch({
				type: AGREGAR_PROYECTO,
				payload: resultado.data,
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};
};

// Valida el formulario por errores
export const mostrarError = () => {
	return async (dispatch) => {
		dispatch({
			type: VALIDAR_FORMULARIO,
		});
	};
};

// Selecciona el Proyecto que el usuario dio click
export const proyectoActual = (proyectoId) => {
	return async (dispatch) => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoId,
		});
	};
};

// Elimina un proyecto
export const eliminarProyecto = (proyectoId) => {
	return async (dispatch) => {
		try {
			await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: proyectoId,
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};
};

// Obtener las tareas de un proyecto
export const obtenerTareas = (proyecto) => {
	return async (dispatch) => {
		console.log(proyecto);

		try {
			const resultado = await clienteAxios.get('/api/tareas', {
				params: { proyecto },
			});
			console.log(resultado);
			dispatch({
				type: TAREAS_PROYECTO,
				payload: resultado.data.tareas,
			});
		} catch (error) {
			console.log(error.response);
		}
	};
};

// Agregar una tarea al proyecto seleccionado
export const agregarTarea = (tarea) => {
	return async (dispatch) => {
		console.log(tarea);
		try {
			const resultado = await clienteAxios.post('/api/tareas', tarea);
			console.log(resultado);
			dispatch({
				type: AGREGAR_TAREA,
				payload: tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};
};
// Valida y muestra un error en caso de que sea necesario
export const validarTarea = () => {
	return async (dispatch) => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};
};

// Eliminar tarea por id
export const eliminarTarea = (id, proyecto) => {
	return async (dispatch) => {
		try {
			await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
			dispatch({
				type: ELIMINAR_TAREA,
				payload: id,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Edita o modifica una tarea
export const actualizarTarea = (tarea) => {
	console.log(tarea);
	return async (dispatch) => {
		try {
			const resultado = await clienteAxios.put(
				`/api/tareas/${tarea._id}`,
				tarea
			);

			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: resultado.data.tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Extrae una tarea para edición
export const guardarTareaActual = (tarea) => {
	return async (dispatch) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};
};

// Elimina la tareaseleccionada
export const limpiarTarea = () => {
	return async (dispatch) => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};
};

import React, { useState, useEffect } from 'react';
import {
	actualizarTarea,
	agregarTarea,
	limpiarTarea,
	obtenerTareas,
	validarTarea,
} from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const FormTarea = () => {
	const tareaseleccionada = useSelector((state) => state.tareaseleccionada);
	const proyecto = useSelector((state) => state.proyecto);
	const errortarea = useSelector((state) => state.errortarea);

	const dispatch = useDispatch();


	// // State del formulario
	 const [tarea, setTarea] = useState({
         nombre: ''
     });
   const { nombre } = tarea;
 
	console.log('TAREAAAAA',tarea)
    

	 const handleChange = (e) => {
		setTarea({
 		...tarea,
	 		[e.target.name]: e.target.value,
	 	});
	 };

    useEffect(() => {
		if (tareaseleccionada !== null) {
			setTarea(tareaseleccionada);
		} 
        else {
			setTarea({
				nombre: '',
			});
		}
	}, [tareaseleccionada]);

	// Si no hay proyecto seleccionado
	if (!proyecto) return null;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;


	// Effect que detecta si hay una tarea seleccionada

	const handleSubmit = (e) => {
		e.preventDefault();

		// // validar
		if (nombre.trim() === '') {
			validarTarea();
			return;
		}

		// Si es edición o si es nueva tarea
		if (tareaseleccionada === null) {
			// agregar la nueva tarea al state de tareas
			tarea.proyecto = proyectoActual._id;
			dispatch(agregarTarea(tarea));
		} else {
			// actualizar tarea existente
			dispatch(actualizarTarea(tarea));

			// Elimina tareaseleccionada del state
			dispatch(limpiarTarea());
		}
		// Obtener y filtrar las tareas del proyecto actual
		dispatch(obtenerTareas(proyectoActual.id));

		// // reiniciar el form
		// setTarea({
		// 	nombre: '',
		// });
	};


	return (
		<div className='formulario'>
			<form onSubmit={ handleSubmit}>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre Tarea...'
						name='nombre'
						value={nombre}
						onChange={handleChange}
					/>
				</div>

				<div className='contenedor-input'>
					<input
						type='submit'
						className='btn btn-primario btn-submit btn-block'
						value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
					/>
				</div>
			</form>

			{errortarea ? (
				<p className='mensaje error'>El nombre de la tarea es obligatorio</p>
			) : null}
		</div>
	);
};

export default FormTarea;

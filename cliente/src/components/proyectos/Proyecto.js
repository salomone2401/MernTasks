import React from 'react';
import {useDispatch } from 'react-redux';
import { proyectoActual, obtenerTareas } from '../redux/actions';



const Proyecto = ({proyecto}) => {
    const dispatch = useDispatch()

    // Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        dispatch(proyectoActual(id)); // Fijar un proyecto actual
        dispatch(obtenerTareas(id)); // Filtrar las tareas cuando se de click
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id) }
            >{proyecto.nombre} </button>
        </li>
     );
}
 
export default Proyecto;
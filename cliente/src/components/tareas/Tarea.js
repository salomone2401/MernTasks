import React from 'react';
import { actualizarTarea, eliminarTarea, guardarTareaActual, obtenerTareas } from '../redux/actions';
import {useSelector, useDispatch  } from 'react-redux';
import Swal from 'sweetalert2'

const Tarea = ({tarea}) => {
    
    const proyecto = useSelector(state => state.proyecto);
  
    // Extraer el proyecto
    const [proyectoActual] = proyecto;
    const dispatch = useDispatch()

    // Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = id => {
      
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            dispatch(eliminarTarea(id, proyectoActual._id));
            dispatch(obtenerTareas(proyectoActual.id))
          })
    }


    // Función que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true
        }
        dispatch(actualizarTarea(tarea));
    }

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        dispatch(guardarTareaActual(tarea));
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre} </p>

            <div className="estado">
                {tarea.estado 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea) }
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;
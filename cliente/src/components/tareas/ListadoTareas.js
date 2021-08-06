import React, { Fragment, useContext} from 'react';
import Tarea from './Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { eliminarProyecto } from '../redux/actions';
import {useSelector, useDispatch  } from 'react-redux';
const ListadoTareas = () => {

    
    const proyecto = useSelector(state => state.proyecto);
    const tareasproyecto = useSelector(state => state.tareasproyecto);
    const dispatch = useDispatch()

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] =  proyecto;
console.log(proyectoActual._id)
    // Elimina un proyecto
    const onClickEliminar = () => {
        dispatch(eliminarProyecto(proyectoActual._id))
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>) 
                    : 
                    <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea 
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>

            <button     
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;
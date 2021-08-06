import React, { Fragment, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { mostrarError,  agregarProyecto, mostrarFormulario } from '../redux/actions';


const NuevoProyecto = () => {

    const  formulario = useSelector(state => state.formulario);
    const  errorformulario = useSelector(state => state.errorformulario);
    const dispatch = useDispatch()
    // State para Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    // Extraer nombre de proyecto
    const { nombre } = proyecto;

    // Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = async e => {
        e.preventDefault();

        // Validar el proyecto
        if(nombre === '') {
            dispatch(mostrarError());
            return;
        }
        // agregar al state
       dispatch(agregarProyecto(proyecto))
    
        // Reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    // Mostrar el formulario
    const onClickFormulario = () => {
        dispatch(mostrarFormulario());
    }

    return ( 
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickFormulario }
            >Nuevo Proyecto</button>

            { formulario ? 
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />

                        </form>
                ) : null }

            { errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p>  : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;
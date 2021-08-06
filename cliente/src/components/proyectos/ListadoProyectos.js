import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {useSelector } from 'react-redux';
import {useDispatch } from 'react-redux';
import { mostrarAlerta, obtenerProyectos } from '../redux/actions';
const ListadoProyectos = () => {


    const dispatch = useDispatch()
    const mensaje = useSelector(state => state.mensaje);
     const alerta = useSelector(state => state.alerta);
     const proyectos= useSelector(state => state.proyectos);
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if(mensaje) {
            dispatch(mostrarAlerta(mensaje.msg, mensaje.categoria));
        }

        dispatch(obtenerProyectos());
        // eslint-disable-next-line
    }, [mensaje]);

    // revisar si proyectos tiene contenido
    if(proyectos !== undefined && proyectos.length === 0){
          return <p>No hay proyectos, comienza creando uno</p>;
    }
    return ( 

        <ul className="listado-proyectos">
            
        
            { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }


            <TransitionGroup>
                {proyectos !== undefined ?
                
                proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))
                : null}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;
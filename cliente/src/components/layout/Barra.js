import React, {useEffect} from 'react';
import { cerrarSesion, usuarioAutenticado } from '../redux/actions';
import {useSelector,useDispatch } from 'react-redux';

const Barra = () => {
    const dispatch = useDispatch()
    const usuario = useSelector(state => state.usuario);



    useEffect(() => {
     usuarioAutenticado();
        // eslint-disable-next-line
    }, []);



    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre} </span> </p> : null}
            

            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => dispatch(cerrarSesion()) }
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;
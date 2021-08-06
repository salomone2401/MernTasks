import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector } from 'react-redux';
import { usuarioAutenticado } from '../redux/actions';
import {useDispatch } from 'react-redux';
const RutaPrivada = ({ component: Component, ...props  }) => {

    const  autenticado = useSelector(state => state.autenticado);
    const  cargando = useSelector(state => state.cargando);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(usuarioAutenticado());
        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => !autenticado && !cargando ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}
 
export default RutaPrivada;
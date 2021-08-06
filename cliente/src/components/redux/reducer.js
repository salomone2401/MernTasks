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
    LIMPIAR_TAREA
} from '../../types';

const initialState = {
    alerta: null,
    token: localStorage.getItem('token'),
    autenticado: false,
    usuario: null, 
    mensaje: null, 
    cargando: true,
    proyectos : [],
    formulario : false,
    errorformulario: false,
    proyecto: null, 
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
}



function rootReducer(state = initialState, action) {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                alerta: null
            }
            case REGISTRO_EXITOSO:
                case LOGIN_EXITOSO:
                    localStorage.setItem('token', action.payload.token);
                    return {
                        ...state,
                        autenticado: true,
                        mensaje: null,
                        cargando: false
                    }
                case OBTENER_USUARIO: 
           
                    return {
                        ...state,
                        autenticado: true,
                        usuario: action.payload, 
                        cargando: false
                    }
                case CERRAR_SESION:
                case LOGIN_ERROR:
                case REGISTRO_ERROR:
                    localStorage.removeItem('token');
                    return {
                        ...state,
                        token: null,
                        usuario: null,
                        autenticado: null,
                        mensaje: action.payload, 
                        cargando: false
                    }
                    case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state, 
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload )
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload ),
                proyecto: null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
            case TAREAS_PROYECTO:
                return {
                    ...state,
                    tareasproyecto: action.payload
                }
            case AGREGAR_TAREA:
                return {
                    ...state,
                    tareasproyecto: [action.payload, ...state.tareasproyecto],
                    errortarea: false
                }
            case VALIDAR_TAREA:
                return {
                    ...state,
                    errortarea: true
                }
            case ELIMINAR_TAREA:
                return {
                    ...state,
                    tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload )
                }
            case ACTUALIZAR_TAREA:
                return {
                    ...state,
                    tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea )
                }
            case TAREA_ACTUAL:
                console.log('HOLAAAA',action.payload)
                return {
                    ...state,
                    tareaseleccionada: action.payload
                }
            case LIMPIAR_TAREA:
                return {
                    ...state,
                    tareaseleccionada: null
                }
        default:
            return state;
    }
}

export default rootReducer;
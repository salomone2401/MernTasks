const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear un proyecto
//api/proyectos
router.post('/', 
//primero va al middleware, verifica todas las condiciones y de ahi se ejecuta lo q sigue
     auth,
     [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
     ],
    proyectoController.crearProyecto
);

//obtener todos los proyectos
router.get('/', 
     auth,
    proyectoController.obtenerProyectos
);
//actualizar proyecto via ID
router.put('/:id', 
     auth,
     [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
     ],
    proyectoController.actualizarProyecto
);

//eliminar proyecto via ID
router.delete('/:id', 
     auth,
    proyectoController.eliminarProyecto
);


module.exports= router;
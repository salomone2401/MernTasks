//aca voy a crear la tabla de usuarios
const mongoose = require('mongoose');
//esquima 
const UsuariosSchema = mongoose.Schema({
        nombre:{
        //le agrego el trim para que  si el usuario escribe con espacios no salgan errores
            type: String,
            required: true,
            trim: true
        },
        
        email:{
            //le agrego el unique para que el usuario sea unico
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            trim: true
        },
        registro: {
            //coloco un valor por default que es cuando se hace el registro se guarda la fecha en q se hace
            type: Date,
            default: Date.now()
        }
});
module.exports = mongoose.model('Usuario', UsuariosSchema);
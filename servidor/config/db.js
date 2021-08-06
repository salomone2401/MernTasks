//contectando la base de datos con la aplicacion
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'})
const conectarDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_MONGO, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
        });
        console.log('db conectada');
        
    }catch(error){
        console.log('hubo un error');
        console.log(error);
        process.exit(1) //en caso de q haya un error en la conexion, detener la app

    }

} 
module.exports = conectarDB;

//importamos express
const express = require('express')
const conectarDB = require('./config/db');
const cors = require('cors');
//crear el servidor
const app= express();

//conectar a la base de datos
conectarDB();

//habilitar express.json
app.use(express.json({extended: true}));
//Variable de entorno
//lo q estoy haciendo es decir si no existe la variable de entorno PORT asignale el puerto 4000
const port = process.env.PORT || 4000;
app.use(cors());

//importar routers
//le agrego el /api/ para que el backend sea extendible, para que todos los endpoints que sean de la api terminen con api
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));
//definir la pagina principal
app.get('/', (req, res) =>{
    res.send('hola mundo')
})
//arrancar la app
app.listen(port, '0.0.0.0', () =>{
    console.log(`EL SERVIDOr esta corriendo en el peurto ${port}`);
})
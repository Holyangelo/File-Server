//require
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config');
//end require

class Server { //class server name

    //constructor for the server
    constructor() {
        //create a new instance FOR EXPRESS
        this.app = express();

        //anexamos el puerto
        this.port = process.env.PORT;

        //ruta de los usuarios (solo como referencia, no es obligatorio)
        this.usersPath = '/users';

        //connect to the database
        this.connectDB();


        //middleware
        this.middleware();

        //agregamos las rutas
        this.routes();

    }

    async connectDB() {
        //create a new connection to the database
        await dbConnection();
    }

    middleware() { //vamos a crear una funcion para los middlewares
        //CORS - Siempr es importante colocarlo para que podamos saltarnos ciertas funciones de algunos navegadores
        this.app.use(cors());
        //POST - parse (lectura con parseo del body)
        this.app.use(express.json());
        //middleware para public
        this.app.use(express.static('public')); //el "use" es el elemento clave para la creacion de los middlewares
    }

    routes() { // creamos esta funcion llamada rutas, aqui vamos a crear todas las rutas de nuetra app
        //main function
        this.app.use(this.usersPath, require('../routes/users')); //configuramos el acceso a las rutas usando app.use('apuntar a donde se hara la peticion', require(lugar donde se encuentran las rutas)
        /* this.app.get('/hello-world', (req, res) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
             res.json({
                 code: 200,
                 message: 'You are use GET request'
             });
         });
 
         this.app.put('/hello-world', (req, res) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
             res.json({
                 code: 200,
                 message: 'You are use PUT request'
             });
         });
 
         this.app.post('/hello-world', (req, res) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
             res.status(201).json({
                 code: 200,
                 message: 'You are use POST request'
             });
         });
 
         this.app.delete('/hello-world', (req, res) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
             res.json({ // para controlar los estados de respuesta se usa res.status(codigo del la peticion).json(data)
                 code: 200,
                 message: 'You are use DELETE request'
             });
         });
 
         this.app.patch('/hello-world', (req, res) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
             res.json({
                 code: 200,
                 message: 'You are use PATCH request'
             });
         });*/
    }

    listen() { // creamos la funcion de escuchar, aqui vamos a tener los puertos a escuchar de nuestro servidor
        //listen on port
        this.app.listen(this.port, () => { //aqui no tengo el port, sino que debo llamarlo desde el constructor como this.port
            console.log(`this app is listening on ${this.port}`);
        });
    }
}

module.exports = Server;
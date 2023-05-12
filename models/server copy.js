//require
const express = require('express');
//end require

class Server { //class server name

    //constructor for the server
    constructor() {
        this.app = express();

        //anexamos el puerto
        this.port = process.env.PORT;

        //middleware
        this.middleware();

        //agregamos las rutas
        this.routes();

    }

    middleware() { //vamos a crear una funcion para los middlewares
        this.app.use(express.static('public')); //el "use" es el elemento clave para la creacion de los middlewares
    }

    routes() { // creamos esta funcion llamada rutas, aqui vamos a crear todas las rutas de nuetra app 
        //main function
        this.app.get('/hello-world', (req, res) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
            res.send('Hello, world!');
        });
    }

    listen() { // creamos la funcion de escuchar, aqui vamos a tener los puertos a escuchar de nuestro servidor
        //listen on port
        this.app.listen(this.port, () => { //aqui no tengo el port, sino que debo llamarlo desde el constructor como this.port
            console.log(`this app is listening on ${this.port}`);
        });
    }
}

module.exports = Server;
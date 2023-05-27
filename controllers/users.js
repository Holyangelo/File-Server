//requires
const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/users'); // es un estandar que se importe con la primera letra en mayus
const { validationResult } = require('express-validator');
const { validateFields } = require('../middleware/middleware');
//end requires

//creamos los controladores para cada una de las rutas
const usersGet = (req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //extraemos los params de lo que enviemos en la query de la ruta
    //const query = req.query;
    const { name = "no name", api_key, q, page_origin = 1, limit } = req.query;
    res.json({
        code: 200,
        message: 'You are use GET request - Controller',
        name,
        api_key,
        q,
        page_origin,
        limit
    });
}
// PUT
const usersPut = (req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //body request
    const { id } = req.params;
    res.json({
        code: 200,
        message: 'You are use PUT request - Controller',
        id: id
    });
}
//POST
const usersPOST = async (req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    /*const errors = validationResult(req); // validationResult es una funcion del express validator que almacena los errores y los agrupa para mostrarlos
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }*/
    //body request 
    //const body = req.body (esto se usa si queremos recibir todos los argumentos del esquema)
    const { name, password, email, role } = req.body; // aqui desestructuramos solo lo que nos interesa
    //instanciamos la conexion a la db y el schema
    // const user = new User(body) (De esta forma enviamos el body completo)
    const user = new User({ name, password, email, role }); // aqui enviamos solo los datos que requerimos desestructurados
    //verificamos si el correo existe
    const emailExist = await User.findOne({ email });
    if(emailExist){
        return res.status(400).json({
            msg:'Correo ya existe'
        })
    }
    //creamos un salt: numero de vueltas para generar la encriptacion
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt ); //hash es para encriptarlo en una sola via
    //body request desestructurando lo que necesito
    //const { name, age } = req.body;
    //para guardar en la db usamos .save()
    await user.save();
    //convertimos la funcion en async para que podamos esperar la respuesta.
    res.json({
        code: 200,
        message: 'You are use POST request - Controller',
        user
    });
}
//DELETE
const usersDelete = (req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    res.json({
        code: 200,
        message: 'You are use DELETE request - Controller'
    });
}
//PATCH
const usersPatch = (req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    res.json({
        code: 200,
        message: 'You are use PATCH request - Controller'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPOST,
    usersDelete,
    usersPatch
}
//requires
const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/users'); // es un estandar que se importe con la primera letra en mayus
const { validationResult } = require('express-validator');
const { validateFields } = require('../middleware/middleware');
const { emailIsValid } = require('../helpers/db-validators');
//end requires

//creamos los controladores para cada una de las rutas
const usersGet = async(req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //extraemos los params de lo que enviemos en la query de la ruta
    //const query = req.query;
    //forma de hacer el get sin db
    //const { name = "no name", api_key, q, page_origin = 1, limit } = req.query;
    //Si quiero obtener los argumentos que vienen en el query del link para el request puedo hacerlo usando const { arg } = req.query
    const { limit = 4, init = 0} = req.query;
    //GET - todos los usuarios que se encuentran en la db
    const queries = { status:true };
    /*const users = await User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    .skip(Number(init))
    .limit(Number(limit));*/
    /*res.json({
        code: 200,
        message: 'You are use GET request - Controller',
        name,
        api_key,
        q,
        page_origin,
        limit
    });*/
    /*const total = await User.countDocuments({ status:true });*/// dentro del countDocuments({condicion}) podemos enviar las condiciones de busqueda
    //podemos realizar una desestructuracion de arreglos para darle nombre a las promesas segun su posicion
    const [total, users] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
    //User.countDocuments({ status:true }),
    //User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    User.countDocuments(queries),
    User.find(queries)
    .skip(Number(init))
    .limit(Number(limit))
    ]);

    res.json({
        //total,
        //users
        //resp
        total, 
        users
    });
}
// PUT
const usersPut = async(req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //body request
    const { id } = req.params;
    const { _id, google, password, email,  ...rest } = req.body;

    // Validar contra DB
    if(password){
    //creamos un salt: numero de vueltas para generar la encriptacion
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt ); //hash es para encriptarlo en una sola vias
    }
    //actualizar registro
    const user = await User.findByIdAndUpdate( id, rest); // esta funcion me permite buscar un registro por el id y actualizarlo
    res.json({
        code: 200,
        message: 'You are use PUT request - Controller',
        user
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
    /*const emailExist = await User.findOne({ email });
    if(emailExist){
        return res.status(400).json({
            msg:'Correo ya existe'
        })
    }*/
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
const usersDelete = async (req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    const { id } = req.params;
    //borrar fisicamente de la base de datos
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, { status:false }); // puedo colocar el campo a actualizar en el mismo findByIdAndUpdate
    res.json({
        code: 200,
        message: 'You are use DELETE request - Controller',
        user
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
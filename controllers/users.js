//requires
const { response } = require('express');
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
const usersPOST = (req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //body request 
    //const body = req.body;
    //body request desestructurando lo que necesito
    const { name, age } = req.body;
    res.json({
        code: 200,
        message: 'You are use POST request - Controller',
        name: name,
        age: age
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
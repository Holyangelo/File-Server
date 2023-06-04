//require
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { check } = require('express-validator');
const { Error } = require('mongoose');
const { login, googleSignIn } = require('../controllers/auth');
const { find } = require('../controllers/find');
//end require

//instanciamos
const router = new Router();
//end instanciamos

//main

//GET
//requerimos la coleccion en la que vamos a buscar y el termino del documento para la busqueda
router.get('/:collection/:terms', find);
// END GET


//exports 
module.exports = router;
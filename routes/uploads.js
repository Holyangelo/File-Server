//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { check } = require('express-validator');
const { Error } = require('mongoose');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields, validateJWT } = require('../middleware');
const { uploadFile } = require('../controllers/uploads');
//end require

//instanciamos
const router = new Router();
//end instanciamos

//POST
router.post('/',[
	validateJWT,
	validateFields
	], uploadFile);


//exports
module.exports = router;
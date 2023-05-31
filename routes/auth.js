//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { check } = require('express-validator');
const { Error } = require('mongoose');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-field');
//end require

//instanciamos
const router = new Router();
//end instanciamos

//POST for new path '/login'
router.post('/login',[
	check('email', 'el email es obligatorio').isEmail(),
	check('password', 'password es obligatorio').notEmpty(),
	validateFields
	], login);


//exports 
module.exports = router;
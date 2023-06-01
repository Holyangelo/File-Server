//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { check } = require('express-validator');
const { Error } = require('mongoose');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-field');
//end require

//instanciamos
const router = new Router();
//end instanciamos

//main
//obtener todas las categorias y es un servicio un publico
router.get('/', ( req, res )=> {
	res.status(200).json({
		msg: 'GET - OK'
	})
});

//obtener todas las categorias mediante un id
router.get('/:id', ( req, res )=> {
	res.status(200).json({
		msg: 'GETID - OK'
	})
});

//crear una categorias mediante un id
router.post('/', ( req, res )=> {
	res.status(200).json({
		msg: 'POST - OK'
	})
});

//actualizar una categoria mediante un id
router.put('/:id', ( req, res )=> {
	res.status(200).json({
		msg: 'PUT - OK'
	})
});

//borrar una categoria mediante un id
router.delete('/:id', ( req, res )=> {
	res.status(200).json({
		msg: 'DELETE - OK'
	})
});


//exports 
module.exports = router;
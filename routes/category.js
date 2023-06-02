//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { check } = require('express-validator');
const { Error } = require('mongoose');
const { login, googleSignIn } = require('../controllers/auth');
const User = require('../models/users');
const {validateFields,  validateJWT, isAdminRole, validateRole } = require('../middleware');
const { categoryCreate, categoryGet, categoryGetId, categoryGetIdByUser, categoryPut, categoryDelete } = require('../controllers/category');
const { validateCategory, idFind } = require('../helpers/db-validators');
//end require

//tarea
//obtener categorias - paginado - populate
//obtener categorias  - populate {}
//actualizar categoria
//borrar categoria

//instanciamos
const router = new Router();
//end instanciamos

//main
//obtener todas las categorias y es un servicio un publico
router.get('/', categoryGet /*( req, res )=> {
	res.status(200).json({
		msg: 'GET - OK'
	})
}*/);

//obtener todas las categorias mediante un id
router.get('/:id', [
	validateJWT,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(id => validateCategory(id)),
	validateFields
	], categoryGetId /*( req, res )=> {
	res.status(200).json({
		msg: 'GETID - OK'
	})
}*/);

//obtener los datos de las categorias creadas por un usuario
router.get('/user/:id', [
	validateJWT,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(id => idFind(id)),
	validateFields
	], categoryGetIdByUser /*( req, res )=> {
	res.status(200).json({
		msg: 'GETID - OK'
	})
}*/);

//crear una categorias mediante un id
router.post('/', [
	validateJWT,
	check('name', 'the name is required').notEmpty(),
	validateFields
	], categoryCreate /*( req, res )=> {
	res.status(200).json({
		msg: 'POST - OK'
	})
}*/);

//actualizar una categoria mediante un id
router.put('/:id', [
	validateJWT,
	check('id', 'No es un ID valido').isMongoId(), // isMongoId me permite evaluar el ID en la base de datos si existe para indicar si es valido o no
	check('id', 'category not exist').custom( id => validateCategory(id)),
	isAdminRole,
	validateFields
	], categoryPut /*( req, res )=> {
	res.status(200).json({
		msg: 'PUT - OK'
	})
}*/);

//borrar una categoria mediante un id
router.delete('/:id', [
	validateJWT,
	check('id', 'No es un ID valido').isMongoId(), // isMongoId me permite evaluar el ID en la base de datos si existe para indicar si es valido o no
	check('id', 'category not exist').custom( id => validateCategory(id)),
	isAdminRole,
	validateFields
	], categoryDelete /*( req, res )=> {
	res.status(200).json({
		msg: 'DELETE - OK'
	})
}*/);


//exports 
module.exports = router;
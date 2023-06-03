//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { check } = require('express-validator');
const { Error } = require('mongoose');
const { login, googleSignIn } = require('../controllers/auth');
const User = require('../models/users');
const Product = require('../models/product');
const {
	validateFields,  
	validateJWT, 
	isAdminRole, 
	validateRole } = require('../middleware');
/*const { 
	productCreate, 
	productGet, 
	productGetId, 
	productGetIdByUser, 
	productPut, 
	productDelete } = require('../controllers/product');*/
const { productGet, productGetId, productGetIdByUser, productCreate, productPut, productDelete } = require('../controllers/product');
const { validateCategory, idFind, validateProduct, validateProductExist } = require('../helpers/db-validators');
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
router.get('/', productGet /*( req, res )=> {
	res.status(200).json({
		msg: 'GET - OK'
	})
}*/);

//obtener todas las categorias mediante un id
router.get('/:id',[
	validateJWT,
	check('id', 'invalid id').isMongoId(),
	//check('id').custom(id => validateCategory(id)),
	validateFields
	], productGetId /*( req, res )=> {
	res.status(200).json({
		msg: 'GETID - OK'
	})
}*/);

//obtener los datos de las categorias creadas por un usuario
router.get('/user/:id',[
	validateJWT,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(id => idFind(id)),
	validateFields
	], productGetIdByUser /*( req, res )=> {
	res.status(200).json({
		msg: 'GETID - OK'
	})
}*/);

//crear una producto
router.post('/', [
	validateJWT,
	check('name', 'the name is required').notEmpty(),
	//check('name', 'product named in db').custom((name) => validateProductExist(name)),
	check('category', 'the category is required').notEmpty(),
	check('category', 'the category is not mongo id').isMongoId(),
	check('available', 'the available is required').notEmpty(),
	validateFields
	], productCreate /*( req, res )=> {
	res.status(200).json({
		msg: 'POST - OK'
	})
}*/);

//actualizar un producto mediante un id
router.put('/:id',[
	validateJWT,
	check('id', 'No es un ID valido').isMongoId(), // isMongoId me permite evaluar el ID en la base de datos si existe para indicar si es valido o no
	check('id', 'product not exist').custom(id => validateProduct(id)),
	check('name', 'name dont be empty').notEmpty(),
	check('price', 'price dont be empty').notEmpty(),
	check('category', 'category dont be empty').notEmpty(),
	check('category', 'category not exist').custom( category => validateCategory(category)),
	isAdminRole,
	validateFields
	], productPut /*( req, res )=> {
	res.status(200).json({
		msg: 'PUT - OK'
	})
}*/);

//borrar una categoria mediante un id
router.delete('/:id',[
	validateJWT,
	check('id', 'No es un ID valido').isMongoId(), // isMongoId me permite evaluar el ID en la base de datos si existe para indicar si es valido o no
	check('id', 'Product not exist').custom( id => validateProduct(id)),
	isAdminRole,
	validateFields
	], productDelete /*( req, res )=> {
	res.status(200).json({
		msg: 'DELETE - OK'
	})
}*/);


//exports 
module.exports = router;
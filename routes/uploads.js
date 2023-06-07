//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { check } = require('express-validator');
const { Error } = require('mongoose');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields, validateJWT, validateFile } = require('../middleware');
const { validateCategory, validateProduct, allowedCollections } = require('../helpers');
const { uploadFile, getImage, updateImage, updateImageCloudinary } = require('../controllers/uploads');
//end require

//instanciamos
const router = new Router();
//end instanciamos

//GET
router.get('/:collection/:id',[
	validateJWT,
	check('id', 'invalid id').isMongoId(),
	check('id', 'id is not empty').notEmpty(),
	check('collection', 'collection dont be empty').notEmpty(),
	check('collection').custom( c => allowedCollections(c, ['users', 'categories', 'products'])),
	validateFields
	], getImage);

//POST
router.post('/',[
	validateJWT,
	validateFile,
	validateFields
	], uploadFile);

//PUT
/*router.put('/:collection/:id', [
	validateJWT,
	check('id', 'invalid id').isMongoId(),
	check('id', 'id is not empty').notEmpty(),
	check('collection').custom( c => allowedCollections(c, ['users', 'categories', 'products'])),
	validateFile,
	validateFields
	], updateImage);*/

//PUT
router.put('/:collection/:id', [
	validateJWT,
	check('id', 'invalid id').isMongoId(),
	check('id', 'id is not empty').notEmpty(),
	check('collection').custom( c => allowedCollections(c, ['users', 'categories', 'products'])),
	validateFile,
	validateFields
	], updateImageCloudinary);

//exports
module.exports = router;
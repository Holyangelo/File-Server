//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { usersGet, usersPut, usersPOST, usersDelete, usersPatch } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/middleware');
const { roleIsValid, emailIsValid, idFind } = require('../helpers/db-validators');
const { Error } = require('mongoose');
//end require

//instance
const router = new Router();
//end instance

//main function
//como ya tengo configurada una direccion a la cual apuntar la peticion, se eliminan las /hello world
//una vez configurados los controllers se pasa es la referencia routers.(accion)('lugar a donde apuntar la peticion', referencia del controlador)
//GET
router.get('/', usersGet);
//PUT
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(), // isMongoId me permite evaluar el ID en la base de datos si existe para indicar si es valido o no
    check('id').custom(id => idFind(id)),
    check('role').custom((role) => roleIsValid(role)),
    validateFields
],  usersPut); //en el caso de que quiera recibir un parametro de un request por la ruta podria colocarlo aqui directamente
//POST
router.post('/', [
    check('name', 'nombre no puede estar vacio').notEmpty().escape(),
    check('password', 'password obligatorio').notEmpty().isLength({ min:6 }), 
    check('email', 'correo no es valido').isEmail().escape(),
    check('email', 'Correo ya existe').custom((email) => emailIsValid(email)).escape(),
    //check('role', 'no es un rol permitido').isIn(['ADMIN_ROLE', 'MOD_ROLE']),
    //Para validar desde la DB podemos usar custom lo que permite crear una validacion personalizada, asignamos un valor por defecto al rol en caso de que no tenga
    /*check('role').custom( async(role = '' ) =>{
        const existRole = await Role.findOne({ role });// findOne me sirve para buscar un objeto dentro de una clase o para buscar dentro de un elemento otro elemento.
        if( !existRole ){
            throw new Error(`El rol ${role} ingresado no es valido`);
        }
    }),*/
    check('role').custom((role) => roleIsValid(role)),
    validateFields
], usersPOST); // cuando queremos realizar el envio de un middleware podemos hacerlo a traves de la ruta
// en este caso el check es una funcion del express-validator y se usa para comprobar si algo es valido o no check(campo a comprobar, mensaje de salida)
//DELETE
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(), // isMongoId me permite evaluar el ID en la base de datos si existe para indicar si es valido o no
    check('id').custom(id => idFind(id)),
    validateFields
    ], usersDelete);
//PATCH
router.patch('/', usersPatch);




module.exports = router;
//require 
const { Router } = require('express'); // desestrcuturamos de express la funcion Router para comenzar a manejar nuestras rutas
const { usersGet, usersPut, usersPOST, usersDelete, usersPatch } = require('../controllers/users');
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
router.put('/:id', usersPut); //en el caso de que quiera recibir un parametro de un request por la ruta podria colocarlo aqui directamente
//POST
router.post('/', usersPOST);
//DELETE
router.delete('/', usersDelete);
//PATCH
router.patch('/', usersPatch);




module.exports = router;
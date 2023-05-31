//require
const { response, request } = require('express');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
//end require

//main 
const validateJWT = async ( req = request, res = response, next) =>{
	const token = req.header('api-token');

	if (!token) {
		// statement
		return res.status(401).json({
			msg:'token not found'
		});
	}

	try {
		// statements

		// utilizaos el metodo verify de jsonwebtoken para validar, jwt.verify(token que enviamos, token almacenado)
		//const payload = jwt.verify(token, process.env.SECRET_KEY_JWT);
		//desestructuramos el uid del usuario
		const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT);
		//leemos los datos del usuario 
		const userAuth = await User.findById( uid );

		//verificar si el usuario existe 
		if (!userAuth) {
			// statement
			return res.status(401).json({
				msg:`user not exist`
			});
		}
		//verificar si el usuario no esta marcado como false
		if (!userAuth.status) {
			// statement
			return res.status(401).json({
				msg:`invalid token 401`
			});
		}
		//enviamos la informacion del usuario en la request
		req.userAuth = userAuth;
		req.uid = uid;
		//console.log(payload);
		//si esta funcion nos genera un error, el programa no continua.
		//llamamos el next para que continue con lo que sigue
		next();
	} catch(e) {
		// statements
		console.log(e);
		res.status(401).json({
			msg:'token isnt valid'
		})
	}
}

//exports
module.exports = {
	validateJWT
}
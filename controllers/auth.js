//require
const bcryptjs = require('bcryptjs')
const { response, request } = require('express');
const User = require('../models/users');
const { generateJWT } = require('../helpers/generate-jwt');
//end require

//creamos el controlador para Auth
const login = async(req, res = response) => {
	//desestructuramos los campos que vamos a requerir
	const { email, password } = req.body;

	//creamos un try catch

	try {
		// statements

		//verificar si el email existe
		const user = await User.findOne({email});
		if (!user) {
			// statement
			return res.status(400).json({
				msg:'user or password are incorrect'
			});
		}
		//verificar si el usuario esta activo
		if (!user.status) {
			// statement
			return res.status(400).json({
				msg:'user isnt active' 
			});
		}
		//verificar la contrasena
		const validPassword = bcryptjs.compareSync(password, user.password); //compareSync del paquete bcryptjs nos ayuda a comparar el argumento que le enviamos contra el que existe en la db
		//compareSync(password de la db, password ingresado) asi se envia los password
		if (!validPassword) {
			// statement
			return res.status(400).json({
				msg:'user or password are incorrect' 
			});
		}

		//Generar JWT
		const token = await generateJWT( user.id );
        //recibo el usuario y le envio el token
		res.json({
		user,
		token
	});
	} catch(error) {
		return res.status(500).json({
			msg:'Algo ha salido mal',
			error
		})
	}
	/*
	res.json({
		msg:'Login status 200 OK'
	})*/
}

module.exports = {
	login
}
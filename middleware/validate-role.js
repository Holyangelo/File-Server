//require
const { request, response } = require('express')
//end require

const isAdminRole = async( req = request, res = response, next) =>{

try {
	// statements
	if (!req.userAuth) {
		// statement
		return res.status(500).json({
			msg:'token validation is required'
		});
	}
	//Como en el anterior middleware ya hice un proceso para obtener los datos del usuario en userAuth no tengo necesidad de volver a llamar a la base de datos
	const { role, name } = req.userAuth;// desestructuro los parametros que quiero
	//verifico el role del usuario
	if (role !== 'ADMIN_ROLE') {
		// statement
		return res.status(401).json({
			msg:'role user must be admin for exec delete'
		});
	}
	//si todo esta bien continua
	next();
} catch(e) {
	// statements
	console.log(e);
}
}

const validateRole = ( ...role ) =>{

	//aqui debo retornar una funcion, ya que estoy mandando a llamar la funcion con los roles y ademas debo usar otra funcion para los req, res, next
	return (req, res = response, next)=>{
try {
	// statements
	if (!req.userAuth) {
		// statement
		return res.status(500).json({
			msg:'token validation is required'
		});
	}
	//verificamos el rol
	if (!role.includes(req.userAuth.role)) {
		// statement
		return res.status(401).json({
			msg:`the user require be ${role}`
		})
	}
	console.log(role, req.userAuth.role);
	//si todo esta bien continua
	next();
} catch(e) {
	// statements
	console.log(e);
	throw new Error(e);
}
}
}

//exports
module.exports = {
	isAdminRole,
	validateRole
}
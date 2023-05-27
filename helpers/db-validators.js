//require
const Role = require('../models/roles');
const User = require('../models/users'); // es un estandar que se importe con la primera letra en mayus
//end require

//funcion para validar rol
const roleIsValid = async(role = '') => {
const existRole = await Role.findOne({ role });// findOne me sirve para buscar un objeto dentro de una clase o para buscar dentro de un elemento otro elemento.
        if( !existRole ){
            throw new Error(`El rol ${role} ingresado no es valido`);
        }
    };

const emailIsValid = async(email = '') => {
    const emailExist = await User.findOne({ email });
    if(emailExist){
        /*return res.status(400).json({
            msg:'Correo ya existe'
        })*/
        throw new Error(`El correo ${email},  ingresado ya existe`);
    }
}

module.exports = {
    roleIsValid,
    emailIsValid
}
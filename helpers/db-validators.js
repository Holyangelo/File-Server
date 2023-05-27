//require
const Role = require('../models/roles');
//end require

//funcion para validar rol
const roleIsValid = async(role = '') =>{
        const existRole = await Role.findOne({ role });// findOne me sirve para buscar un objeto dentro de una clase o para buscar dentro de un elemento otro elemento.
        if( !existRole ){
            throw new Error(`El rol ${role} ingresado no es valido`);
        }
    };

module.exports = {
    roleIsValid
}
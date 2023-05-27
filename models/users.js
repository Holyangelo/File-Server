//require
const { Schema, model } = require('mongoose');
//end require

const userSchema = Schema({
    //require : true, (mensaje de error en caso de que no sea enviado)
    //enum: permite seleccionar solo las opciones encapsuladas []
    name: {
        type: String,
        required: [true, 'Debe ingresar el nombre de usuario']
    },
    email: {
        type: String,
        required: [true, 'Debe ingresar el correo de usuario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Debe ingresar una contraseña']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Debe ingresar un rol'],
        enum: ['ADMIN_ROLE', 'MOD_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

module.exports = model('User', userSchema);
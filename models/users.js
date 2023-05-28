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
        enum: ['ADMIN_ROLE', 'MOD_ROLE', 'IT_ROLE']
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

//esta funcion me permite sobreescribir el equipo o las caracteristicas de cada de uno de los parametros
//en una funcion de flecha no podemos usar this, por eso esta funcion es normal
userSchema.methods.toJSON = function(){
    // estoy desestructurando el objeto en sus componentes, { version, el campo que quiero modificar, el campo donde quiero aconglomerar todo}
    const { __v, password, ...user } = this.toObject();
    return user;
}

//exports
module.exports = model('User', userSchema);
//require
const { Schema, model } = require('mongoose');
//end require

const  categorySchema = Schema({
    name: {
        type: String,
        require: [true, 'the name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

//esta funcion me permite sobreescribir el equipo o las caracteristicas de cada de uno de los parametros
//en una funcion de flecha no podemos usar this, por eso esta funcion es normal
categorySchema.methods.toJSON = function(){
    // estoy desestructurando el objeto en sus componentes, { version, el campo que quiero modificar, el campo donde quiero aconglomerar todo}
    const { __v, status, ...category } = this.toObject();
    //user.uid = _id;
    return category;
}
//exports area
module.exports = model('category', categorySchema );
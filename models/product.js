//require
const { Schema, model } = require('mongoose');
//end require

const  productSchema = Schema({
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
    },
    price: {
        type: Number,
        default:0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    description:{
        type: String,
    },
    available:{
        type: Boolean,
        default: false,
        require: true
    },
    img:{
        type: String
    }
});

//esta funcion me permite sobreescribir el equipo o las caracteristicas de cada de uno de los parametros
//en una funcion de flecha no podemos usar this, por eso esta funcion es normal
productSchema.methods.toJSON = function(){
    // estoy desestructurando el objeto en sus componentes, { version, el campo que quiero modificar, el campo donde quiero aconglomerar todo}
    const { __v, status, ...product } = this.toObject();
    //user.uid = _id;
    return product;
}
//exports area
module.exports = model('Product', productSchema );
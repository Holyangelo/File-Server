//require
const { Schema, model } = require('mongoose');
//end require

const roleSchema = Schema({
    role: {
        type: String,
        require: [true, 'el rol es obligatorio']
    }
});

//exports area
module.exports = model('roles', roleSchema )
import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const adminSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },

});

const Admins = model('Admins', adminSchema); // rnp collection 

export default Admins;
// module.exports = Rnp;
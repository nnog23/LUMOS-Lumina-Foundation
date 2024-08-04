import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const rnpSchema = new Schema({
    title: {
        type: SchemaTypes.String,
        required: true
    },
    body: {
        type: SchemaTypes.String,
        required: true
    },
    dateTime: {
        type: SchemaTypes.Date,
        required: true
    },
    published: {
        type: SchemaTypes.Number
    }
});

const Rnp = model('Rnp', rnpSchema); // rnp collection 

export default Rnp;
// module.exports = Rnp;
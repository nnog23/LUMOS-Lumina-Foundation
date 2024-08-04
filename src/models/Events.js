import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const eventsSchema = new Schema({
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

const Events = model('Events', eventsSchema); // events collection 

export default Events;
// module.exports = Events;
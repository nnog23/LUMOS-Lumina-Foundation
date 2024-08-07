import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const newsSchema = new Schema({
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
    },
    imageurl: {
        type: SchemaTypes.String,
        required: true
    }
});

const News = model('News', newsSchema); // news collection 

export default News;
// module.exports = News;
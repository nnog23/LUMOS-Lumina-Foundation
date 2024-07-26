import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const newsSchema = new Schema({
    id: {
        type: SchemaTypes.ObjectId,
        required: true
    },
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
    }
});

const News = model('News', newsSchema); // posts collection 

export default News;
// module.exports = Post;
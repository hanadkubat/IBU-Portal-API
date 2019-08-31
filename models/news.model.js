const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    img: { 
        data: Buffer, 
        contentType: String 
    }
})

module.exports = mongoose.model('news', NewsSchema)

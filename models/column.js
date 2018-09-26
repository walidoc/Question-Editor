const mongoose = require('mongoose')
const Schema = mongoose.Schema
const imgUri = require('../config/keys').defaultImgUrl


// create Schema
const ColumnSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: imgUri,
        required: true
    },
    val: {
        type: String,
        required: true
    },
    idx: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Column', ColumnSchema)
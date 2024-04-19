const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        require: true
    },
    shortUrlId: {
        type: String,
        require: false
    },
    isDelete: {
        type: Number,
        default: 1
    }
}, { timestamps: true })

module.exports = mongoose.model("shortenUrl", urlSchema)
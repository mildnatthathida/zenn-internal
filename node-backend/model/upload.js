const mongoose = require('mongoose')

const FileSchema = mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    textContent: {
        type: String,
        // type:Buffer,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const File = mongoose.model('File', FileSchema)

module.exports = File
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/NotesSaver')

const notesSchema = mongoose.Schema ({
    title:String,
    desc:String
})

module.exports = mongoose.model('note',notesSchema) 
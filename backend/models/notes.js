const mongoose = requrie("mongoose")

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "General"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        // required: true
    }
})

module.exports = mongoose.model("notes", notesSchema, "notes")


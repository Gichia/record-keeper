const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', },
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    type: { type: String, },
    dueDate: { type: Date, },
    isCompleted: { type: Boolean, default: false, },
    dateCreated: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('record', RecordSchema);

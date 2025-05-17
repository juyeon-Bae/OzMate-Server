const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cardId: { type: Schema.Types.ObjectId, ref: 'InfoCard', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);

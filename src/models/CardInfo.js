const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    cardId: { type: Number, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    detailTitle: { type: String, required: true },
    detailContent: { type: String, required: true },
    isBookmarked: { type: Boolean, default: false }
}, { timestamps: true });

const Card = mongoose.model('cardSchema', cardSchema)
module.exports = Card;
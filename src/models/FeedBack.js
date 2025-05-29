const mongoose = require('mongoose')

const FeedBackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
})

const FeedBack = mongoose.model('FeedBackSchema', FeedBackSchema)
module.exports = FeedBack
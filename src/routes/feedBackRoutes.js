const express = require('express')
const FeedBack = require('../models/FeedBack')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body
        const newFeedBackCard = new FeedBack({ title, content })
        await newFeedBackCard.save()
        res.status(201).json(newFeedBackCard)
    } catch (err) {
        res.status(500).json({ message: '피드백 저장 성공', err })
    }
})

router.get('/', async (req, res) => {
    try {
        const feedback = await FeedBack.find()
        res.json({ message: '불러오기 성공', feedback })
    } catch (err) {
        res.status(500).json({ message: '피드백 불러오기 실패', err })
    }
})
module.exports = router;
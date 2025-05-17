const express = require('express');
const router = express.Router();
const BookMark = require('../models/Bookmark')
const InfoCard = require('../models/CardInfo')

//북마크 추가
router.post('/', async (req, res) => {
    const { userId, cardId } = req.body;

    try {
        const existing = await BookMark.findOne({ userId, cardId })

        if (existing) {
            return res.status(400).json({ message: '이미 북마크 됨' })
        }

        const newBookmark = await new BookMark({ userId, cardId }).save();
        res.status(201).json({ message: '북마크 추가 성공', '북마크 한 정보 카드': newBookmark })
    }
    catch (err) {
        res.status(500).json({ message: '북마크 추가 실패', error: err });
    }
})

//북마크 삭제
router.delete('/', async (req, res) => {
    const { userId, cardId } = req.body;

    try {
        const deleteItem = await BookMark.findOneAndDelete({ userId, cardId })
        res.json({ message: '북마크 제거됨', '제거된 북마크': deleteItem })
    }
    catch (err) {
        res.status(500).json({ message: '북마크 삭제 실패', err })
    }
})

module.exports = router;
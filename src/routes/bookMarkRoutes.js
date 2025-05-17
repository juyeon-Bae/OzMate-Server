const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bookmark = require('../models/Bookmark');
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

//user 북마크 목록 조회
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    //ObjectId 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: '유효하지 않은 userId임' });
    }

    try {
        const bookmarks = await Bookmark.find({ userId: new mongoose.Types.ObjectId(userId) }).populate('cardId');
        const cards = bookmarks.map(bm => bm.cardId);
        res.json({ '북마크 한 리스트들 조회': cards });
    }
    catch (err) {
        console.error('북마크 조회 실패:', err);
        res.status(500).json({ message: '북마크 조회 실패', err });
    }
});

// 특정 카드 북마크 돼 있는지 확인
router.get('/check/:userId/:cardId', async (req, res) => {
    const { userId, cardId } = req.params;

    try {
        const exists = await Bookmark.findOne({ userId, cardId });
        res.json({
            message: '북마크 되어 잇음',
            '찾으려고 하는 북마크 조회': exists
        });
    } catch (err) {
        res.status(500).json({ message: '찾을 수 없음', error: err });
    }
});

module.exports = router;
const express = require('express')
const Card = require('../models/CardInfo');
const mongoose = require('mongoose');
const router = express.Router()

//랜덤으로 3개씩 카드 조회 api
router.get('/', async (req, res) => {
    const { cardId } = req.body;
    if (!cardId) {
        return res.status(400).json({ message: 'cardId가 필요합니다.' });
    }

    try {
        const excludedId = new mongoose.Types.ObjectId(cardId);

        const randomCards = await Card.aggregate([
            //$match란! -> 조건에 맞는 문서만 골라냄 
            { $match: { _id: { $ne: excludedId } } }, //해당 id가 아닌것만, $ne(not equal)
            { $sample: { size: 3 } } //랜덤으로 3개 추출
        ])
        res.json(randomCards)
    }
    catch (err) {
        res.status(500).json({ message: '3개씩 랜덤으로 정보 카드 불러오기 실패' })
    }
})
module.exports = router
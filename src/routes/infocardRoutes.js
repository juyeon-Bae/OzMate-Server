const express = require('express');
const Card = require('../models/CardInfo')
const router = express.Router();

// 정보 추가
router.post('/add', async (req, res) => {
    try {
        const { cardId, title, subtitle, category, image, detailTitle, detailContent } = req.body;
        const newCard = new Card({ cardId, title, subtitle, category, image, detailTitle, detailContent })
        await newCard.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//카드 목록 조회
//infoCard/category?type=전체 
router.get('/category', async (req, res) => {
    try {
        const { type } = req.query;
        let cards;

        if (type === "ALL") {
            cards = await Card.find()
        } else {
            cards = await Card.find({ category: type })
        }

        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: '불러오기 실패' })
    }
})

// 상세 페이지 조회
/* 
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const card = await Card.findById(id);

        if (!card) {
            return res.status(404).json({ message: '카드를 찾을 수 없어요.' });
        }

        res.json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
*/


// 정보 카드 삭제
router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: '삭제할 카드 id가 필요' })
        }

        const deletedCard = await Card.findByIdAndDelete(id) //카드 삭제

        if (!deletedCard) {
            return res.status(404).json({ message: '카드를 찾을 수 없음' })
        }

        res.json({ message: '카드가 삭제 완료', deletedCard })

    } catch (err) {
        res.status(500).json({ message: '삭제 실패' })
    }
})

//모든 정보 삭제
router.delete('/deleteAll', async (req, res) => {
    try {
        const result = await Card.deleteMany({})
        res.json({ message: '모든 카드 삭제 완료' })
    } catch (err) {
        res.status(500).json({ message: '모두 삭제 실패함', err })
    }
})

module.exports = router;
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
    try {
        // response -> 전체 응답 객체
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/KRW`);

        //호주 환율만 가져오기
        const audRate = response.data.conversion_rates.AUD
        res.json({ rate: audRate })
    } catch (err) {
        res.status(500).json({ message: '환율 데이터 불러올 수 없음' })
    }
})
module.exports = router;
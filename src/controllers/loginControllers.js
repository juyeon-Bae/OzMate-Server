const jwt = require('jsonwebtoken');
const User = require('../models/User')
const bcrypt = require('bcrypt');

const loginController = {
    loginUser: async (req, res) => {
        const { userid, password } = req.body;

        if (!userid || !password) {
            return res.status(400).json({ message: '아이디와 비번을 입력해주세요' })
        }

        try {
            //db에서 사용자 정보 조회
            const user = await User.findOne({ userid });

            if (!user) {
                return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }

            //비번 불일치 여부
            //bcrype.compare(입력한 비번과 해시된 비번 일치하는지 확인)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }

            //로그인 성공시 토큰 발급 
            const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.status(200).json({
                message: '로그인 성공',
                username: user.username,
                token
            });

        } catch (err) {
            return res.status(500).json({ message: '서버 에러' });
        }

    }
}

module.exports = loginController;
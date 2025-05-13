const User = require('../models/User')
const bcrypt = require('bcrypt')

const signupController = {
    signupUser: async (req, res) => {
        const { username, userid, password, passwordConfirm } = req.body;

        if (!username || !userid || !password || !passwordConfirm) {
            return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        try {
            const existingUser = await User.findOne({ userid });
            if (existingUser) {
                return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, userid, password: hashedPassword });
            await newUser.save();

            return res.status(201).json({ message: '회원가입 성공' });
        } catch (error) {
            return res.status(500).json({ message: '서버 에러' });
        }
    }
}
module.exports = signupController;
import { body, validationResult } from 'express-validator';
import { getUser } from '../db/queries.js';
import bcrypt from 'bcryptjs';
const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isAlpha()
        .withMessage('Username must contain letters')
];

const dbLoginCheck = async (req) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const { rows } = await getUser(username);
    const user = rows[0];
    return await bcrypt.compare(password, user.password);
}

export const login = [
    validateLogin,
    async (req, res) => {
        console.log('validate login')
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'login',
                errors: errors.array(),
            });
        }

        if (await dbLoginCheck(req)) {
            res.redirect('/success');
        } else {
            res.redirect('/fail');
        }
    }
]
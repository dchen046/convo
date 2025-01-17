import { body, validationResult } from 'express-validator';
import expressAsyncHandler from "express-async-handler";
import dotenv from 'dotenv'

const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isAlpha()
        .withMessage('Username must contain letters')
];

export const login = [
    validateLogin,
    (req, res) => {
        console.log('validate login')
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'login',
                errors: errors.array(),
            });
        }

        const username = req.body.username;
        const password = req.body.password;
        console.log(`user: ${username}`);
        console.log(`pass: ${password}`);
        if (username === process.env.USERNAME && password === process.env.PASSWORD) {
            res.redirect('/success')
        } else {
            res.redirect('fail');
        }
    }
]
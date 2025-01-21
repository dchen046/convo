import { createUser } from "../db/queries.js";
import { body, validationResult } from 'express-validator';

const validateSignUp = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isAlpha()
        .withMessage('Username must contain letters'),
    body('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 5 })
        .withMessage("Password must be longer")
]

export const signup = [
    validateSignUp,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'login',
                errors: errors.array(),
            });
        }

        if (req.body.code === process.env.SU_CODE) {
            const username = req.body.username;
            const password = req.body.password;
            if (await createUser(username, password)) {
                console.log(result);
            } else {
                console.log('no result')
            }
        } else {
            console.log('bad code');
        }
    }
]


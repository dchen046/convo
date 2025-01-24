import { Router } from "express";
import { getMessages, createMessage, deleteMessage } from "../db/queries.js";

const homeRouter = Router();

homeRouter.get('/',
    async (req, res) => {
        if (req.user) {
            const { rows } = await getMessages(req.user.username);
            res.render('home', { user: req.user, entries: rows });
        } else {
            console.log(false);
            res.render('home', { user: false });
        }
    });

homeRouter.post('/',
    async (req, res) => {
        const entry = req.body.entry;
        const username = req.user.username;
        const added = await createMessage(username, entry);

        const { rows } = await getMessages(req.user.username);

        res.render('home', { user: req.user, entries: rows });
    }
)

export default homeRouter;
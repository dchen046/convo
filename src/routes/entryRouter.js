import { Router } from "express";
import { deleteMessage } from "../db/queries.js";

const entryRouter = Router();

entryRouter.get('/',
    async (req, res) => {
        if (req.user) {
            res.render('entry-form');
        } else {
            res.redirect('home');
        }
        
    });

entryRouter.get('/delete/:entryId',
    async (req, res) => {
        if (req.user) {
            const entryId = req.params.entryId;
            const delEntry = await deleteMessage(entryId);
        }
        res.redirect('/home');
    }
)

export default entryRouter;
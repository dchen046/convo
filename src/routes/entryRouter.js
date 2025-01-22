import { Router } from "express";

const entryRouter = Router();

entryRouter.get('/', 
    async (req, res) => {
        res.render('entry-form');
});

export default entryRouter;
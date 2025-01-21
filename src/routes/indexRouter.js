import { Router } from "express";

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.render('index', { user: req.user, messages: req.session.flash })
});

export default indexRouter;
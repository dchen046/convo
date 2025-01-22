import { Router } from "express";

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    if (!req.user) {
        res.render('index', { messages: req.session.flash });
    } else {
        res.redirect('home');
    }
});

export default indexRouter;
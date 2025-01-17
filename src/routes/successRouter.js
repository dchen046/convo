import { Router } from "express";

const successRouter = Router();

successRouter.get('/', (req, res) => res.render('success'));

export default successRouter;
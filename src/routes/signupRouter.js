import { Router } from "express";
import { signup } from "../controllers/signupController.js";

const signupRouter = Router();

signupRouter.get('/', (req, res) => res.render('sign-up-form'));
signupRouter.post('/', signup);

export default signupRouter;
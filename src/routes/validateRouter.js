import { Router } from "express";
import { login } from "../controllers/validateController.js";

const validateRouter = Router();

validateRouter.post('/', login);

export default validateRouter;
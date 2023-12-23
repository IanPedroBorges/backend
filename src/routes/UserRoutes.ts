import { Request, Response, Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

const userControll = new UserController();

router.post('/login', (req:Request, res:Response) => userControll.login(req, res));

router.post('/register', (req:Request, res:Response) => userControll.create(req, res));

export default router;
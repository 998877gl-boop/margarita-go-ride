import { Router, type IRouter } from "express";
import healthRouter from "./health";
import telegramRouter from "./telegram";
import messagesRouter from "./messages";
import usersRouter from "./users";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(telegramRouter);
router.use(messagesRouter);
router.use(usersRouter);
router.use(statsRouter);

export default router;

import { Router } from "express";
const router = Router();
import * as songController from "../../controllers/client/song.controller";

router.get("/:slugTopic", songController.list);

export const songRoutes: Router = router;
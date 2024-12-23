import { Router } from "express";
const router = Router();
import * as songController from "../../controllers/client/song.controller";

router.get("/:slugTopic", songController.list);

router.get("/detail/:slugSong", songController.detail);

export const songRoutes: Router = router;
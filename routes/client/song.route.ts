import { Router } from "express";
const router = Router();
import * as songController from "../../controllers/client/song.controller";

router.get("/:slugTopic", songController.list);
router.get("/detail/:slugSong", songController.detail);
router.patch("/like/:typeLike/:idSong", songController.like);

export const songRoutes: Router = router;
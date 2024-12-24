import { Router } from "express";
const router = Router();
import * as songController from "../../controllers/client/song.controller";

router.get("/:slugTopic", songController.list);
router.get("/detail/:slugSong", songController.detail);
router.patch("/like/:typeLike/:idSong", songController.like);
router.patch("/favorite/:typeFavorite/:idSong", songController.favorite);


export const songRoutes: Router = router;
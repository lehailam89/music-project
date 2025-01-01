import { Router } from "express";
const router = Router();
import * as favoriteSongController from "../../controllers/client/favorite-song.controller";

router.get("/", favoriteSongController.index);

export const favoriteSongRoutes: Router = router;
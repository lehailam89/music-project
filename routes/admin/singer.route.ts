import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/admin/singer.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.get("/", controller.index);

export const singerRoutes: Router = router;
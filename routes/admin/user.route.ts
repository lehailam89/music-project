import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/admin/user.controller";

const upload = multer();

router.get("/", controller.index);

export const userRoutes: Router = router;
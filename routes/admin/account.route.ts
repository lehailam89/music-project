import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/admin/account.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import { requireAuth } from "../../middlewares/admin/auth.middleware";

const upload = multer();

router.get("/", requireAuth, controller.index);
router.get("/create", requireAuth, controller.create);
router.post("/create",
    requireAuth,
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.createPost
);

export const accountRoutes: Router = router;
import { Router } from "express";
import multer from "multer";
const upload = multer();
const router: Router = Router();
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import * as controller from "../../controllers/admin/upload.controller";
router.post("/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.index
);
export const uploadRoute = router;
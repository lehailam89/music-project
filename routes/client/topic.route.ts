import { Router } from "express";
const router = Router();
import * as topicController from "../../controllers/client/topic.controller";

router.get("/", topicController.topics);

export const topicRoutes: Router = router;
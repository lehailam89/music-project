import { Router } from "express";
const router = Router();

import * as searchController from "../../controllers/client/search.controller";

router.get("/result", searchController.result);

export const searchRoutes: Router = router;
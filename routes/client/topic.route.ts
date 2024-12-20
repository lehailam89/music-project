import { Request, Response, Router } from "express";
const router = Router();
import Topic from "../../models/topic.model";

router.get("/", async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false
    });

    res.render("client/pages/topics/index", {
        topics
    });
});

export const topicRoutes: Router = router;
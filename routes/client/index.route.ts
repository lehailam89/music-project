import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { searchRoutes } from "./search.route";
import { userRoutes } from "./user.route";

const clientRoutes = (app: Express): void => {
    
    app.use(`/topics`, topicRoutes);
    app.use(`/songs`, songRoutes);
    app.use(`/favorite-songs`, favoriteSongRoutes);
    app.use(`/search`, searchRoutes);
    app.use(`/user`, userRoutes);
    app.use(`/auth`, userRoutes); // Thêm dòng này để định nghĩa route `/auth`
};

export default clientRoutes;
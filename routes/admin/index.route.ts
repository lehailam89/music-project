import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { systemConfig } from '../../config/config';
import { topicRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { singerRoutes } from './singer.route';
import { userRoutes } from './user.route';
import { uploadRoute } from './upload.route';


const adminRoutes = (app: Express): void => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);

    app.use(`${PATH_ADMIN}/topics`, topicRoutes);

    app.use(`${PATH_ADMIN}/songs`, songRoutes);

    app.use(`${PATH_ADMIN}/upload`, uploadRoute);

    app.use(`${PATH_ADMIN}/singers`, singerRoutes);

    app.use(`${PATH_ADMIN}/users`, userRoutes)
};

export default adminRoutes;
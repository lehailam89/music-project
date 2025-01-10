import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { systemConfig } from '../../config/config';
import { topicRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { singerRoutes } from './singer.route';
import { userRoutes } from './user.route';
import { uploadRoute } from './upload.route';
import { roleRoutes } from './role.route';
import { permissionRoutes } from './permission.route';
import { authRoutes } from './auth.route';
import { accountRoutes } from './account.route';
import * as authMiddleware from '../../middlewares/admin/auth.middleware';


const adminRoutes = (app: Express): void => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, authMiddleware.requireAuth, dashboardRoutes);

    app.use(`${PATH_ADMIN}/topics`, authMiddleware.requireAuth, topicRoutes);

    app.use(`${PATH_ADMIN}/songs`, authMiddleware.requireAuth, songRoutes);

    app.use(`${PATH_ADMIN}/upload`, authMiddleware.requireAuth, uploadRoute);

    app.use(`${PATH_ADMIN}/singers`, authMiddleware.requireAuth, singerRoutes);

    app.use(`${PATH_ADMIN}/users`, authMiddleware.requireAuth, userRoutes)

    app.use(`${PATH_ADMIN}/accounts`, authMiddleware.requireAuth, accountRoutes);

    app.use(`${PATH_ADMIN}/roles`, authMiddleware.requireAuth, roleRoutes);

    app.use(`${PATH_ADMIN}/permissions`, authMiddleware.requireAuth, permissionRoutes);
    
    app.use(`${PATH_ADMIN}/auth`, authRoutes);
};

export default adminRoutes;
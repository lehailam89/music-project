import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/admin/permission.controller';

router.get('/', controller.permissions);
router.patch('/', controller.permissionsPatch);

export const permissionRoutes: Router = router;
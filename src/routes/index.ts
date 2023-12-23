import { Router } from "express";

const router = Router();

import UserRoute from './UserRoutes';

router.use('/users', UserRoute );

export default router;
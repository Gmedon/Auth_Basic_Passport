import { Router } from 'express';
import { privateRoute } from '../config/passport'

import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', privateRoute, ApiController.login);

router.get('/list', ApiController.list);

export default router;
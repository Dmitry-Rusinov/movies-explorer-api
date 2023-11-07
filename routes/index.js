import { Router } from 'express';
import userRoutes from './users.js';
import movieRoutes from './movies.js';
import adminsRouter from './admins.js';
import auth from '../middlewares/auth.js';
import NotFound from '../errors/NotFound.js';
import { signout } from '../controllers/user.js';

const router = Router();

router.use('/', adminsRouter);

router.use(auth);

router.use('/', userRoutes);
router.use('/', movieRoutes);
router.get('/signout', signout);

router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

export default router;

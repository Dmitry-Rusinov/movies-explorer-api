import { Router } from 'express';
/* import {
  loginValidation,
  createUserValidation,
} from '../middlewares/requestValidation.js'; */
import { createUser, signin, signout } from '../controllers/user.js';

const adminsRouter = Router();

/* adminsRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */
adminsRouter.post('/signin', /* loginValidation, */ signin);
adminsRouter.post('/signup', /* createUserValidation, */ createUser);
adminsRouter.get('/signout', signout);

export default adminsRouter;

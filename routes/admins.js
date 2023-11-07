import { Router } from 'express';
import {
  loginValidation,
  createUserValidation,
} from '../middlewares/requestValidation.js';
import { createUser, signin/* , signout */ } from '../controllers/user.js';

const adminsRouter = Router();

adminsRouter.post('/signin', loginValidation, signin);
adminsRouter.post('/signup', createUserValidation, createUser);
/* adminsRouter.get('/signout', signout); */

export default adminsRouter;

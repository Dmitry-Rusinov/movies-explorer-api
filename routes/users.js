import { Router } from 'express';

import { updateUserProfile, getInfoByCurrentUser } from '../controllers/user.js';

const userRoutes = Router();

userRoutes.get('/users/me', getInfoByCurrentUser);

userRoutes.patch('/users/me', /* updateUserProfileValidation, */ updateUserProfile);

export default userRoutes;

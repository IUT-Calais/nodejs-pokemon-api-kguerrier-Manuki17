import { Router } from 'express';

import  {
    createUser,
    loginUser
} from './users.controller';

export const userRouter = Router();

// --- Configuration des routes -----------------------------------
userRouter.post('/', createUser);

userRouter.post('/login', loginUser);
// ----------------------------------------------------------------
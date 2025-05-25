/*
Autrice : Manon Chagot
Classe : BUT 2 APP
Année : 2025
*/
import { Router } from 'express';

import  {
    getUsers,
    getUserId,
    createUser,
    loginUser,
    updateUser,
    deleteUser
} from './users.controller';

export const userRouter = Router();

// --- Configuration des routes -----------------------------------
userRouter.get('/', getUsers);

userRouter.get('/:userId', getUserId);

userRouter.post('/', createUser);

userRouter.post('/login', loginUser);

userRouter.patch('/:userId', updateUser);

userRouter.delete('/:userId', deleteUser);
// ----------------------------------------------------------------
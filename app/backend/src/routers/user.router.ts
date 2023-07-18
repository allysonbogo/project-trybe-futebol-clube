import { Request, Router, Response } from 'express';
import TokenValidation from '../middlewares/ValidateToken';
import LoginValidation from '../middlewares/ValidateLogin';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.getAll(req, res));

router.get(
  '/role',
  TokenValidation.validateToken,
  (req: Request, res: Response) => userController.returnRole(req, res),
);

router.get('/:id', (req: Request, res: Response) => userController.getById(req, res));

router.post(
  '/',
  LoginValidation.validateLogin,
  (req: Request, res: Response) => userController.getByEmail(req, res),
);

export default router;

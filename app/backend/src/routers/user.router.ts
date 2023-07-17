import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.getAll(req, res));

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.returnRole(req, res),
);

router.get('/:id', (req: Request, res: Response) => userController.getById(req, res));

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.getByEmail(req, res),
);

export default router;

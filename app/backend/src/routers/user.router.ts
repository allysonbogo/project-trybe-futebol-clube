import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => userController.getById(req, res));

router.post('/', (req, res) => userController.getByEmail(req, res));

export default router;

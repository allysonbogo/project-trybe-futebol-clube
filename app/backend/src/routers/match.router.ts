import { Request, Router, Response } from 'express';
import TokenValidation from '../middlewares/ValidateToken';
import MatchValidation from '../middlewares/ValidateMatch';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => matchController.getById(req, res));

router.patch(
  '/:id/finish',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchController.finish(req, res),
);

router.patch(
  '/:id',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchController.update(req, res),
);

router.post(
  '/',
  TokenValidation.validateToken,
  MatchValidation.validateMatch,
  (req: Request, res: Response) => matchController.create(req, res),
);

export default router;

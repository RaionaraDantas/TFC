import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matchesController';
import Validation from '../middlewares/validationToken';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.findAllByQuery(req, res),
);

router.patch(
  '/:id/finish',
  Validation.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  Validation.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;

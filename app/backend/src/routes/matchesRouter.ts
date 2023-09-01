import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAllMatches(req, res));

router.get(
  '/inProgress',
  (req: Request, res: Response) => matchesController.findAllByQuery(req, res),
);

export default router;

import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAllMatches(req, res));

export default router;

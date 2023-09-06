import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const leaderBoardController = new LeaderBoardController();
const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getPotencialteamsHome(req, res),
);

export default router;

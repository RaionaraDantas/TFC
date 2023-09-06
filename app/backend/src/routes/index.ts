import { Router } from 'express';
import teamsRouter from './teamsRouter';
import usersRouter from './usersRouter';
import matchesRouter from './matchesRouter';
import leaderBoardRouter from './leaderBoardRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;

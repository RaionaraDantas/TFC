import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Validation from '../middlewares/validationToken';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validation.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

// router.get(
//   '/role',
//   Validation.validateToken,
//   (req: Request, res: Response) => userController.verifyRole(req, res),
// );

export default router;

import { Router } from 'express';
import teamsRouter from './teamsRouter';

const router = Router();

router.use('/teams', teamsRouter);

// O método use é usado para definir um middleware ou montar um roteador em uma rota específica. Ele pode ser usado para executar funções em todas as solicitações que correspondem a um determinado padrão de rota ou para montar um roteador em uma rota específica.

export default router;

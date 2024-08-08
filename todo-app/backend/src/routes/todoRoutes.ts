import { Router } from 'express';
import TodoController from '../controllers/todoControllers';
import { validateId, validateTask } from '../middlewares/validations';

const router = Router();

router.get('/', TodoController.getAllTasks);
router.post('/', validateTask, TodoController.createTask);
router.put('/:id', validateTask, validateId, TodoController.updateTask);
router.put('/favorite/:id', validateId, TodoController.updateTask);
router.put('/color/:id', validateId, TodoController.updateTask);
router.put('/edit/:id', validateId, TodoController.updateTask);
router.delete('/:id', validateId, TodoController.deleteTask);
router.delete('/', TodoController.deleteAllTasks);

export default router;

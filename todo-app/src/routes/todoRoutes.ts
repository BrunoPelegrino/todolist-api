import { Router } from 'express';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskControllers';
import { validateId, validateTask } from '../middlewares/validations';


const router = Router();

router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', validateId, deleteTask)

export default router;

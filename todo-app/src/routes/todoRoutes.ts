import { Router } from 'express';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskControllers';


const router = Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;

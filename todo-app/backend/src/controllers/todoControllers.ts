import { Request, Response } from 'express';
import TodoService from '../service/todoService';

class TodoController {
  public async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TodoService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to find tasks' });
    }
  }

  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const newTask = await TodoService.createTask(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const [rowsUpdated, [updatedTask]] = await TodoService.updateTask(
        parseInt(req.params.id, 10),
        req.body,
      );
      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(updatedTask);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const rowsDeleted = await TodoService.deleteTask(
        parseInt(req.params.id, 10),
      );
      if (rowsDeleted === 0) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(200).json({ message: 'Task deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
  public async deleteAllTasks(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ message: 'All tasks were successfully deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete all tasks' });
    }
  }
}

export default new TodoController();

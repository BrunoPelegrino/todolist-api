import { Request, Response } from 'express';
import Todo from '../models/Todo';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const tasks = await Todo.findAll();
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const newTask = await Todo.create(req.body);
  res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const [updated] = await Todo.update(req.body, { where: { id: req.params.id } });
  if (updated) {
    const updatedTask = await Todo.findByPk(req.params.id);
    res.status(200).json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const deleted = await Todo.destroy({ where: { id: req.params.id } });
  if (deleted) {
    res.status(200).json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

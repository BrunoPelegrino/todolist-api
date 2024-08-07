import Todo from '../models/Todo';

class TodoService {
  async getAllTasks(): Promise<Todo[]> {
    return Todo.findAll();
  }

  async createTask(data: Partial<Todo>): Promise<Todo> {
    return Todo.create(data);
  }

  async updateTask(id: number, data: Partial<Todo>): Promise<[number, Todo[]]> {
    return Todo.update(data, {
      where: { id },
      returning: true,
    });
  }

  async deleteTask(id: number): Promise<number> {
    return Todo.destroy({
      where: { id },
    });
  }

  async deleteAllTasks(): Promise<number> {
    const rowsDeleted = await Todo.destroy({ where: {}, truncate: true });
    return rowsDeleted;
  }
}

export default new TodoService();

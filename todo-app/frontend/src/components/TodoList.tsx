import { useEffect, useState } from 'react';
import api from '../services/api';

interface Todo {
  id: number;
  title: string;
  description: string;
  color?: string;
  isFavorite?: boolean;
}

function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/todo_list');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteBtn = async (id: number) => {
    try {
      await api.delete(`/todo_list/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('id not found', error);
    }
  };

  const handleFavBtn = async (id: number, isFav: boolean) => {
    try {
      const newFavStatus = !isFav;
      await api.put(`/todo_list/favorite/${id}`, { isFavorite: newFavStatus });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, isFavorite: newFavStatus } : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.title}</p>
            <button
              onClick={() => handleFavBtn(task.id, task.isFavorite ?? false)}
            >
              {task.isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>

            <button onClick={() => handleDeleteBtn(task.id)}>
              Delete task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

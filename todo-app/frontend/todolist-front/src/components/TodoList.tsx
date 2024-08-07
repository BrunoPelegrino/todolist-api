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
        await api.delete(`/todo_list/${id}`)
        setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
        console.error('id not found', error);
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.title}</p>
            <button>fav{task.isFavorite}</button>
            <button onClick={() => handleDeleteBtn(task.id)}>Delete task</button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

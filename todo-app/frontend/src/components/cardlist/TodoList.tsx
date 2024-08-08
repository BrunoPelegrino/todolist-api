import { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './TodoList.module.scss';

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
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isFavorite: newFavStatus } : task,
        ),
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className={styles.TodoList}>
      <h1>Todo List</h1>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <li className={styles.li} key={task.id}>
            <div className={styles.Card}>
              <h2 className={styles.h2}>{task.title}</h2>
              <p className={styles.p}>{task.description}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.buttonFav}
                  onClick={() =>
                    handleFavBtn(task.id, task.isFavorite ?? false)
                  }
                >
                  {task.isFavorite ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.47998 7.50375L2.32617 8.29666L6.88529 11.9638L5.69595 17.5141L9.85865 14.3425L15.0125 17.5141L13.6249 11.9638L17.4903 8.29666L12.2373 7.50375L9.85865 2.34995L7.47998 7.50375Z"
                        fill="#FFA000"
                      />
                      <path
                        d="M9.93823 13.7112L6.29995 15.9077L7.25791 11.7662L4.04538 8.97947L8.28359 8.62145L9.93823 4.71223L11.5929 8.62145L15.8311 8.97947L12.6186 11.7662L13.5765 15.9077M19.6145 7.76026L12.6573 7.17001L9.93823 0.754639L7.2192 7.17001L0.261963 7.76026L5.53553 12.3371L3.9583 19.1396L9.93823 15.5303L15.9182 19.1396L14.3313 12.3371L19.6145 7.76026Z"
                        fill="#455A64"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.93823 13.2503L6.29995 15.4469L7.25791 11.3054L4.04538 8.51865L8.28359 8.16063L9.93823 4.25142L11.5929 8.16063L15.8311 8.51865L12.6186 11.3054L13.5765 15.4469M19.6145 7.29944L12.6573 6.70919L9.93823 0.293823L7.2192 6.70919L0.261963 7.29944L5.53553 11.8763L3.9583 18.6787L9.93823 15.0695L15.9182 18.6787L14.3313 11.8763L19.6145 7.29944Z"
                        fill="#455A64"
                      />
                    </svg>
                  )}
                </button>
                <button
                  className={styles.buttonDelete}
                  onClick={() => handleDeleteBtn(task.id)}
                >
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.22 2.29924L11.8964 0.975616L6.64884 6.22319L1.40126 0.975616L0.0776367 2.29924L5.32521 7.54682L0.0776367 12.7944L1.40126 14.118L6.64884 8.87045L11.8964 14.118L13.22 12.7944L7.97247 7.54682L13.22 2.29924Z"
                      fill="#51646E"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

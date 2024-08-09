import { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './TodoList.module.scss';
import TodoForm from '../todoForm/TodoForm'

interface Todo {
  id: number;
  title: string;
  description: string;
  color?: string;
  isFavorite?: boolean;
}

function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [backgroundCardColor, setBackgroundCardColor] = useState<{
    [key: number]: string;
  }>({});
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/todo_list');
        setTasks(response.data);
        const savedColor = localStorage.getItem('cardColor');
        if (savedColor) {
          setBackgroundCardColor(JSON.parse(savedColor));
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const response = await api.get('/todo_list');
    setTasks(response.data)
  }

  const handleDeleteBtn = async (id: number) => {
    try {
      await api.delete(`/todo_list/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      const updatedColors = { ...backgroundCardColor };
      delete updatedColors[id];
      localStorage.setItem('cardColors', JSON.stringify(updatedColors));
      setBackgroundCardColor(updatedColors);
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

  const handleColorChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const selectedColor = e.target.value;
    await api.put(`/todo_list/color/${id}`, { color: selectedColor });
    const updatedColors = { ...backgroundCardColor, [id]: selectedColor };
    setBackgroundCardColor(updatedColors);
    localStorage.setItem('cardColor', JSON.stringify(updatedColors));
  };

  const handleEditClick = (task: Todo) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/todo_list/edit/${editTaskId}`, {
        title: editTitle,
        description: editDescription,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId
            ? { ...task, title: editTitle, description: editDescription }
            : task,
        ),
      );
      setEditTaskId(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className={styles.TodoList}>
      <TodoForm addTask={handleAddTask}/>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <li className={styles.li} key={task.id}>
            <div
              style={{
                backgroundColor: backgroundCardColor[task.id] || '#ffffff',
              }}
              className={styles.Card}
            >
              {editTaskId === task.id ? (
                <div>
                  <input
                    className={styles.titleInput}
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className={styles.descriptionInput}
                    value={editDescription}
                      name="description"
                      maxLength={5000}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />

                  <button className={styles.editBtns} onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button
                    className={styles.editBtns}
                    onClick={() => setEditTaskId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h1 className={styles.h1}>{task.title}</h1>
                  <div className={styles.separatorLine}></div>
                  <p className={styles.p}>{task.description}</p>
                  <button
                    className={styles.edit}
                    onClick={() => handleEditClick(task)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9443 6.16667L11.8321 7.05444L3.25656 15.6111H2.38767V14.7422L10.9443 6.16667ZM14.3443 0.5C14.1082 0.5 13.8627 0.594444 13.6832 0.773889L11.9549 2.50222L15.4966 6.04389L17.2249 4.31556C17.5932 3.94722 17.5932 3.33333 17.2249 2.98389L15.0149 0.773889C14.826 0.585 14.5899 0.5 14.3443 0.5ZM10.9443 3.51278L0.498779 13.9583V17.5H4.04045L14.486 7.05444L10.9443 3.51278Z"
                        fill="#51646E"
                      />
                    </svg>
                  </button>
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
                    <label className={styles.selectColor}>
                      <svg
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.4957 11.5468C16.4957 11.5468 14.4957 13.7168 14.4957 15.0468C14.4957 15.5772 14.7064 16.086 15.0815 16.461C15.4565 16.8361 15.9652 17.0468 16.4957 17.0468C17.0261 17.0468 17.5348 16.8361 17.9099 16.461C18.285 16.086 18.4957 15.5772 18.4957 15.0468C18.4957 13.7168 16.4957 11.5468 16.4957 11.5468ZM2.70566 10.0468L7.49566 5.25681L12.2857 10.0468M14.0557 8.98681L5.11566 0.046814L3.70566 1.45681L6.08566 3.83681L0.935664 8.98681C0.345664 9.54681 0.345664 10.5168 0.935664 11.1068L6.43566 16.6068C6.72566 16.8968 7.11566 17.0468 7.49566 17.0468C7.87566 17.0468 8.26566 16.8968 8.55566 16.6068L14.0557 11.1068C14.6457 10.5168 14.6457 9.54681 14.0557 8.98681Z"
                          fill="#51646E"
                        />
                        <path
                          d="M7.56462 15.0439L2.73462 10H12.302L7.56462 15.0439Z"
                          fill="#FFA000"
                        />
                      </svg>

                      <input
                        className={styles.hiddeInput}
                        type="color"
                        value={backgroundCardColor[task.id] || '#ffffff'}
                        onChange={(e) => handleColorChange(e, task.id)}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

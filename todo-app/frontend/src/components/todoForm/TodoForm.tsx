import { useState } from 'react';
import api from '../../services/api';
import styles from './TodoForm.module.scss';

interface TaskFormProps {
  addTask: () => void;
}

function TodoForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post('todo_list', { title, description, isFavorite });
      setTitle('');
      setDescription('');
      setIsFavorite(false);

      addTask();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Impede a nova linha no textarea
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className={styles.formContainer}
    >
      
      <input
        type="text"
        value={title}
        name="title"
        onChange={handleInputTitle}
        placeholder="Title"
      />
      <div className={styles.separatorLine}></div>
      <textarea
        value={description}
        onChange={handleInputDescription}
        placeholder="Create note..."
        name="description"
      />
    </form>
  );
}

export default TodoForm;

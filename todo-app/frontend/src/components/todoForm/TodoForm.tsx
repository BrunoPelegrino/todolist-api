import { useState } from 'react';
import api from '../../services/api';

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
    const inputValue = e.target.value;
    setTitle(inputValue);
  }

  const handleInputDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
  }


  return (
  <form onSubmit={handleSubmit}>
    <input type="text" 
    value={title}
    name='title'
    onChange={handleInputTitle}
    />
    <textarea 
    value={description}
    onChange={handleInputDescription}
    name="" 
    id=""/>
    <button type="submit">Add Task</button>
  </form>
  );
}

export default TodoForm;

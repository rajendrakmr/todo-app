import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/tasks').then(res => setTasks(res.data)).catch(() => navigate('/login'));
  }, [navigate]);

  const addTask = async () => {
    if (!title.trim()) return;
    const res = await API.post('/tasks', { title, completed: false });
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const toggle = async (id, completed) => {
    await API.put(`/tasks/${id}`, { completed });
    setTasks(tasks.map(t => t._id === id ? { ...t, completed } : t));
  };

  const remove = async id => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task..." />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <span onClick={() => toggle(t._id, !t.completed)} style={{ textDecoration: t.completed ? 'line-through' : '' }}>
              {t.title}
            </span>
            <button onClick={() => remove(t._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

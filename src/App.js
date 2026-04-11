import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const App = () => {


const [priority, setPriority] = useState('Средний');


const handleAdd = (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  const newExp = {
    id: Date.now(),
    title: title.trim(),
    status,
    priority 
  };

  setExperiments([...experiments, newExp]);
  setTitle('');
};


const sortedList = useMemo(() => {
  const priorityMap = { 'Важный': 3, 'Средний': 2, 'Низкий': 1 };
  return [...filteredList].sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
}, [filteredList]);

    const [experiments, setExperiments] = useState(() => {
    const saved = localStorage.getItem('lab_experiments');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('План');
  const [filter, setFilter] = useState('Все');


  useEffect(() => {
    localStorage.setItem('lab_experiments', JSON.stringify(experiments));
  }, [experiments]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newExp = {
      id: Date.now(),
      title: title.trim(),
      status
    };

    setExperiments([...experiments, newExp]);
    setTitle('');
  };

  const handleDelete = (id) => {
    setExperiments(experiments.filter(exp => exp.id !== id));
  };
  
  const filteredList = useMemo(() => {
    return filter === 'Все' 
      ? experiments 
      : experiments.filter(exp => exp.status === filter);
  }, [experiments, filter]);

  
  const completedCount = useMemo(() => {
    return experiments.filter(exp => exp.status === 'Завершён').length;
  }, [experiments]);

  return (
  <select value={priority} onChange={(e) => setPriority(e.target.value)}>
    <option value="Важный">Важный</option>
    <option value="Средний">Средний</option>
    <option value="Низкий">Низкий</option>
  </select>
    <div className="app-container">
      <header>
        <h1>Система учёта экспериментов</h1>
        <div className="stats-badge">
          Завершено: <span>{completedCount}</span>
        </div>
      </header>

      <section className="form-section">
        <form onSubmit={handleAdd}>
          <input 
            type="text" 
            placeholder="Название эксперимента..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="План">План</option>
            <option value="В процессе">В процессе</option>
            <option value="Завершён">Завершён</option>
          </select>
          <button type="submit" className="add-btn">Добавить</button>
        </form>
      </section>

      <section className="controls">
        <label>Фильтровать: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Все">Все статусы</option>
          <option value="План">План</option>
          <option value="В процессе">В процессе</option>
          <option value="Завершён">Завершён</option>
        </select>
      </section>

      <main>
        <ul className="exp-list">
          {filteredList.map(exp => (
            <li key={exp.id} className={`exp-item status-${exp.status.replace(/\s+/g, '-').toLowerCase()}`}>
              <div className="exp-info">
                <span className="exp-title">{exp.title}</span>
                <span className="exp-status-label">{exp.status}</span>
              </div>
              <button onClick={() => handleDelete(exp.id)} className="delete-btn">Удалить</button>
            </li>
          ))}
        </ul>
        {filteredList.length === 0 && <p className="empty-msg">Список пуст</p>}
      </main>

      <footer className="footer-info">
        <p>Разработчик: Колесников А.Ю.</p>
        <p>Группа: ИУК2-42б</p>
      </footer>
    </div>
  );
};

export default App;
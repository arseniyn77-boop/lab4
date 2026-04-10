import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const App = () => {

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

  
};

export default App;
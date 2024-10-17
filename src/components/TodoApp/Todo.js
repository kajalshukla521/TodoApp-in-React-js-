import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const InputAndFilterContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack input and filter vertically */
  align-items: center; /* Center align them */
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row; /* On larger screens, arrange them in a row */
    justify-content: space-between;
  }
`;

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (taskId, newText) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleCompleteTask = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    const query = searchQuery.toLowerCase();
    return (
      task.text.toLowerCase().includes(query) ||
      task.id.toString().includes(query)
    );
  });

  return (
    <AppContainer>
      <Title>Todo List</Title>
      <InputAndFilterContainer>
        <TodoInput addTask={addTask} />
        <TodoFilter setSearchQuery={setSearchQuery} />
      </InputAndFilterContainer>
      <TodoList 
        tasks={filteredTasks} 
        deleteTask={deleteTask} 
        toggleCompleteTask={toggleCompleteTask} 
        editTask={editTask} 
      />
    </AppContainer>
  );
};

export default Todo;

// src/components/TodoApp/Todo.js
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from local storage on initial render
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Use effect to save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (taskText) => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, // Ensure unique IDs
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Edit Task
  const editTask = (taskId, newText) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle Complete Task
  const toggleCompleteTask = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks based on search query
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

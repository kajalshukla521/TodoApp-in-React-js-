import React from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const TaskListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const TodoList = ({ tasks, deleteTask, toggleCompleteTask, editTask }) => {
  return (
    <TaskListContainer>
      {tasks.map(task => (
        <TodoItem 
          key={task.id} 
          task={task} 
          deleteTask={deleteTask} 
          toggleCompleteTask={toggleCompleteTask} 
         
          editTask={editTask}
        />
      ))}
    </TaskListContainer>
  );
};

export default TodoList;

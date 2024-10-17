import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa'; 

const TaskContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${props => (props.completed ? '#d4edda' : '#fff')};
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const TaskText = styled.span`
  flex-grow: 1;
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  color: ${props => (props.completed ? '#888' : '#333')};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const TodoItem = ({ task, toggleCompleteTask, deleteTask,  editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <TaskContainer completed={task.completed.toString()}>
      {isEditing ? (
        <input 
          type="text" 
          value={newText} 
          onChange={e => setNewText(e.target.value)} 
        />
      ) : (
        <TaskText completed={task.completed}>{task.text}</TaskText>
      )}

      <ActionButtons>
        {isEditing ? (
          <FaCheck onClick={handleSave} style={{ cursor: 'pointer', color: 'green' }} />
        ) : (
          <>
            <FaEdit onClick={handleEdit} style={{ cursor: 'pointer', color: 'blue' }} />
            <FaCheck onClick={() => toggleCompleteTask(task.id)} style={{ cursor: 'pointer', color: 'green' }} />
            <FaTrash onClick={() => deleteTask(task.id)} style={{ cursor: 'pointer', color: 'red' }} />
          </>
        )}
      </ActionButtons>
    </TaskContainer>
  );
};

export default TodoItem;

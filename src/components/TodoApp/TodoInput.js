import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin-left: 5px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoInput = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() !== '') {
      addTask(taskText);
      setTaskText(''); // Clear input after adding
    }
  };

  return (
    <InputContainer>
      <InputField 
        type="text" 
        placeholder="Add a new task" 
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <AddButton onClick={handleSubmit}>Add</AddButton>
    </InputContainer>
  );
};

export default TodoInput;

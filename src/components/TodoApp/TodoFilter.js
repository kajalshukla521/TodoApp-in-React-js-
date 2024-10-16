import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; 

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const InputField = styled.input`
  padding: 10px 40px 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  color: #888;
  font-size: 1.2rem;
`;

const TodoFilter = ({ setSearchQuery }) => {
  return (
    <FilterContainer>
      <InputField 
        type="text" 
        placeholder="Search tasks..." 
        onChange={e => setSearchQuery(e.target.value)} 
      />
      <SearchIcon />
    </FilterContainer>
  );
};

export default TodoFilter;

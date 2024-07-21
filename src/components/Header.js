import React from 'react';
import styled from 'styled-components';

const Header = ({ toggleTheme }) => {
  return (
    <HeaderContainer>
      <h1>Snake Game</h1>
      <HeaderControls>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <a href="https://github.com/Adstar01" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </HeaderControls>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #282c34;
  color: white;
  width: 100%;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 1rem;

  button {
    background: none;
    border: 1px solid white;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

export default Header;

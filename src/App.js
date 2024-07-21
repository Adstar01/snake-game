import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './themes/themes';
import Header from './components/Header';
import Game from './components/Game';
import Footer from './components/Footer';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppContainer>
        <Header toggleTheme={toggleTheme} />
        <Game />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
`;

export default App;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSnakeGame } from '../hooks/useSnakeGame';

const Game = () => {
  const { snake, food, score, highScore, lives, gameOver, moveSnake, startGame, handleTouchStart, handleTouchMove } = useSnakeGame();

  useEffect(() => {
    const handleKeyDown = (e) => moveSnake(e.key);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveSnake]);

  return (
    <GameContainer onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <ScoreBoard>
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
        <div>Lives: {lives}</div>
      </ScoreBoard>
      <GameBoard>
        {gameOver ? (
          <GameOverScreen>
            <h2>Game Over</h2>
            <button onClick={startGame}>Start New Game</button>
          </GameOverScreen>
        ) : (
          snake.map((segment, index) => (
            <SnakeSegment key={index} style={{ top: `${segment[0] * 20}px`, left: `${segment[1] * 20}px` }} />
          ))
        )}
        <Food style={{ top: `${food[0] * 20}px`, left: `${food[1] * 20}px` }} />
      </GameBoard>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const GameBoard = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border: 2px solid #333;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const SnakeSegment = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: green;
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.6);
`;

const Food = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  box-shadow: 0 4px 8px rgba(255, 0, 0, 0.6);
`;

const GameOverScreen = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default Game;

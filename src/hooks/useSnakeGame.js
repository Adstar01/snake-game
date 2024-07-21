import { useState, useCallback, useEffect, useRef } from 'react';

const useSnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const touchStartRef = useRef(null);

  const moveSnake = useCallback((key) => {
    if (key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
    if (key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
    if (key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
    if (key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
  }, [direction]);

  const startGame = () => {
    setSnake([[10, 10]]);
    setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    setDirection('RIGHT');
    setScore(0);
    setLives(3);
    setGameOver(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && direction !== 'LEFT') setDirection('RIGHT');
      if (deltaX < 0 && direction !== 'RIGHT') setDirection('LEFT');
    } else {
      if (deltaY > 0 && direction !== 'UP') setDirection('DOWN');
      if (deltaY < 0 && direction !== 'DOWN') setDirection('UP');
    }
    touchStartRef.current = null;
  };

  useEffect(() => {
    if (gameOver) return;

    const move = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = newSnake[newSnake.length - 1];

        let newHead;
        switch (direction) {
          case 'UP':
            newHead = [head[0] - 1, head[1]];
            break;
          case 'DOWN':
            newHead = [head[0] + 1, head[1]];
            break;
          case 'LEFT':
            newHead = [head[0], head[1] - 1];
            break;
          case 'RIGHT':
            newHead = [head[0], head[1] + 1];
            break;
          default:
            return newSnake;
        }

        if (
          newHead[0] < 0 ||
          newHead[0] >= 20 ||
          newHead[1] < 0 ||
          newHead[1] >= 20 ||
          newSnake.some(([r, c]) => r === newHead[0] && c === newHead[1])
        ) {
          if (lives > 1) {
            setLives(lives - 1);
            setSnake([[10, 10]]);
            setDirection('RIGHT');
          } else {
            setGameOver(true);
            if (score > highScore) setHighScore(score);
          }
          return newSnake;
        }

        newSnake.push(newHead);
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(score + 1);
          setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
        } else {
          newSnake.shift();
        }

        return newSnake;
      });
    };

    const interval = setInterval(move, 200);
    return () => clearInterval(interval);
  }, [direction, snake, food, gameOver, score, lives, highScore]);

  return { snake, food, score, highScore, lives, gameOver, moveSnake, startGame, handleTouchStart, handleTouchMove };
};

export { useSnakeGame };

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import backgroundImage from './Component/Resources/red_sun_ultimate.gif';
import characterImage from './Component/Resources/Spring_2.0.gif';
import pipeImage from './Component/Resources/Pipe.png';

const Game = () => {
  const [gameState, setGameState] = useState('Start'); // Start, Play, End
  const [score, setScore] = useState(0);
  const [characterY, setCharacterY] = useState(200);
  const [characterVY, setCharacterVY] = useState(0);
  const [pipes, setPipes] = useState([]);

  // reference to the character element
  const characterRef = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && gameState === 'Start') {
      setGameState('Play');
    }
  };

  // generate a new set of pipes
  const generatePipes = () => {
    setPipes([
      { x: 500, y: -100, passed: false },
      { x: 800, y: 150, passed: false },
      { x: 1100, y: -50, passed: false },
    ]);
  };

  // move the character based on its velocity
  const moveCharacter = () => {
    setCharacterY(characterY + characterVY);
    characterRef.current.style.top = characterY + 'px';
  };

  // check for collisions with pipes and screen edges
  const checkCollisions = () => {
    if (characterY < 0 || characterY > 480) {
      // collision with top or bottom of screen
      setGameState('End');
    }

    pipes.forEach((pipe) => {
      if (
        characterY > pipe.y &&
        characterY < pipe.y + 200 &&
        characterRef.current.offsetLeft > pipe.x &&
        characterRef.current.offsetLeft < pipe.x + 50
      ) {
        // collision with a pipe
        setGameState('End');
      }
    });
  };

  // handle jumping
  const handleJump = () => {
    if (gameState === 'Play') {
      setCharacterVY(-10);
    }
  };

  // update the game state
  useEffect(() => {
    if (gameState === 'Start') {
      generatePipes();
      setCharacterY(200);
      setCharacterVY(0);
      setScore(0);
    } else if (gameState === 'Play') {
      requestAnimationFrame(moveCharacter);
      requestAnimationFrame(checkCollisions);

      // update the score if the character passes a pipe
      pipes.forEach((pipe) => {
        if (
          characterRef.current.offsetLeft > pipe.x + 50 &&
          pipe.passed === false
        ) {
          setScore(score + 1);
          pipe.passed = true;
        }
      });
    }
  }, [gameState, characterY, pipes, score]);

  // add gravity to the character
  useEffect(() => {
    if (gameState === 'Play') {
      setCharacterVY(characterVY + 0.5);
    }
  }, [gameState, characterVY]);

  return (
    <div className="Game">
      <div className="background">
        <img src={backgroundImage} className="backgroundImage" alt="background" />
      </div>
      <div className="pipes">
        {pipes.map((pipe, index) => (
          <div
            key={index}
            className="pipe"
            style={{
              left: pipe.x + 'px',
              top: pipe.y + 'px',
            }}
          >
            <img src={pipeImage} className="pipeImage" alt="pipe" />
          </div>
        ))}
      </div>
      <div
        className="character"
        ref={characterRef}
        style={{
          left: '100px',
          top: characterY + 'px',
        }}
        onClick={handleJump}
      >
        <img src={characterImage} className="characterImage" alt="character" />
      </div>
      <div className="score">{score}</div>
      <div
        className="startButton"
        onClick={() => setGameState('Play')}
        style={{ display: gameState === 'Start' ? 'block' : 'none' }}
      >
        Start
      </div>
      <div
        className="endMessage"
        style={{ display: gameState === 'End' ? 'block' : 'none' }}
      >
        Game Over! Your score is {score}.
      </div>
    </div>
  );
};

export default Game;
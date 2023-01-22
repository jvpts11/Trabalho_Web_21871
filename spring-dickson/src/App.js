import './App.css';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import springDickson from './Component/Spring'
import Background from './Component/Background';

const move_speed = 3
const gravity = 0.5


const App = () => {

  const [gameState, setGameState] = useState('Start');
  const [score, setScore] = useState(0);
  const springRef = useRef(springDickson);
  const backgroundRef = useRef(Background);

  useEffect(() => {
    if (gameState !== 'Play') return;
    
    function move() {
      if (gameState !== 'Play') return;
    }
    requestAnimationFrame(move);
  }, [gameState]);

  return (
    <div className="App">
      <div className='backgroundObject' ref={backgroundRef}></div>
      <div className='springObject' ref={springRef}></div>
    </div>
  );
}

export default App;

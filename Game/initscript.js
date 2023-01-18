import React, { useState, useEffect } from "react";

const Game = () => {
  const [moveSpeed, setMoveSpeed] = useState(4);
  const [gravity, setGravity] = useState(1);
  const [gameState, setGameState] = useState("Start");
  const [score, setScore] = useState(0);

  const springRef = React.createRef();
  const backgroundRef = React.createRef();

  useEffect(() => 
  {
    // Add an eventlistener for key presses
    document.addEventListener("keydown", (e) => 
    {
      if (e.key === "Enter" && gameState !== "Play") 
      {
        setGameState("Play");
        setScore(0);
        play();
      }
    });
  }, []);

  const play = () => 
  {
    function move() 
    {
      if (gameState !== "Play") return;

      const pipeSprites = document.querySelectorAll(".pipe_sprite");
      pipeSprites.forEach((element) => {
        const pipeSpriteProps = element.getBoundingClientRect();
        const springProps = springRef.current.getBoundingClientRect();

        if (pipeSpriteProps.right <= 0) 
        {
          element.remove();
        } else 
        {
          if (springProps.left < pipeSpriteProps.left + pipeSpriteProps.width && springProps.left + springProps.width > pipeSpriteProps.left && springProps.top < pipeSpriteProps.top + pipeSpriteProps.height && springProps.top + springProps.height > pipeSpriteProps.top) 
          {
            // Change game state and end the game, if collision occurs.
            setGameState("End");
            return;
          } else 
          {
            element.style.left = pipeSpriteProps.left - moveSpeed + "px";
          }
        }
      });

      requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let springDy = 0;
    function applyGravity() 
    {
      if (gameState !== "Play") return;
      springDy = springDy + gravity;
      document.addEventListener("keydown", (e) => 
      {
        if (e.key == " ") {
          setScore(score + 1);
          springDy = -7.6;
        }
      });

      if (springProps.top <= 0 || springProps.bottom >= backgroundRef.current.getBoundingClientRect().bottom) 
      {
        setGameState("End");
        return;
      }
      springRef.current.style.top = springProps.top + springDy + "px";
      requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    let pipeSeperation = 0;

    let pipeGap = 25;
    function createPipe() 
    {
      if (gameState !== "Play") return;

      if (pipeSeperation > 115) 
      {
        pipeSeperation = 0;
  
        let pipePosi = Math.floor(Math.random() * 43) + 8;
        let pipeSprite = document.createElement("div");
        pipeSprite.className = "pipe_sprite";
        pipeSprite.style.top = pipePosi + pipeGap + "vh";
        pipeSprite.style.left = "100vw";
       // pipeSprite.incre...
        document.querySelector(".background").appendChild(pipeSprite);
      } else {
        pipeSeperation++;
      }
      requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
  }
}
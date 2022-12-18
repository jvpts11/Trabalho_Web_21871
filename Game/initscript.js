let move_speed = 3;   
let gravity = 0.5;

let spring = document.querySelector('.spring');
    
let spring_props = spring.getBoundingClientRect();
let background =
    document.querySelector('.background')
            .getBoundingClientRect();
    
let score_val =
    document.querySelector('.score_val');
let message =
    document.querySelector('.message');
let score_title =
    document.querySelector('.score_title');
//let score_title_magnet =
  //  document.querySelector('.score_title_magnet');    
let game_state = 'Start';
    
// Add an eventlistener for key presses
document.addEventListener('keydown', (e) => {
    
  if (e.key == 'Enter' &&
      game_state != 'Play') {
    document.querySelectorAll('.pipe_sprite')
              .forEach((e) => {
      e.remove();
    });
    spring.style.top = '40vh';
    game_state = 'Play';
    message.innerHTML = '';
    score_title.innerHTML = 'Pipe score: ';
   // score_title.innerHTML = 'Magnet score: ';
    score_val.innerHTML = '0';
    play();
  }
});
function play() {
  function move() {
    
    if (game_state != 'Play') return;
  /*  magnet_sprite.forEach((element) => {
        
      let magnet_sprite_props = element.getBoundingClientRect();
      spring_props = spring.getBoundingClientRect();
    let magnet_sprite = document.querySelector('.magnet_sprite');
    if (magnet_sprite_props.right <= 0) {
      element.remove();
    } else if(
      spring_props.left < magnet_sprite_props.left +
      magnet_sprite_props.width &&
      spring_props.left +
      spring_props.width > magnet_sprite_props.left &&
      spring_props.top < magnet_sprite_props.top +
      magnet_sprite_props.height &&
      spring_props.top +
      spring_props.height > magnet_sprite_props.top
    )*/
    let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    pipe_sprite.forEach((element) => {
        
      let pipe_sprite_props = element.getBoundingClientRect();
      spring_props = spring.getBoundingClientRect();
  
      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (
          spring_props.left < pipe_sprite_props.left +
          pipe_sprite_props.width &&
          spring_props.left +
          spring_props.width > pipe_sprite_props.left &&
          spring_props.top < pipe_sprite_props.top +
          pipe_sprite_props.height &&
          spring_props.top +
          spring_props.height > pipe_sprite_props.top
        ) {
            
          // Change game state and end the game
          // if collision occurs
          game_state = 'End';
          message.innerHTML = 'Press Enter To Restart';
          message.style.left = '28vw';
          return;
        } else {
          if (pipe_sprite_props.right < spring_props.left &&pipe_sprite_props.right + move_speed >= spring_props.left &&element.increase_score == '1') {
            score_val.innerHTML = +score_val.innerHTML + 1;
          }
          element.style.left = 
            pipe_sprite_props.left - move_speed + 'px';
        }
      }
  });
  
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
  
  let spring_dy = 0;
  function apply_gravity() {
    if (game_state != 'Play') return;
    spring_dy = spring_dy + gravity;
    document.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        spring_dy = -7.6;
      }
    });
  
    if (spring_props.top <= 0 ||
        spring_props.bottom >= background.bottom) {
      game_state = 'End';
      message.innerHTML = 'Press Enter To Restart';
      message.style.left = '28vw';
      return;
    }
    spring.style.top = spring_props.top + spring_dy + 'px';
    spring_props = spring.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);
  
  let pipe_separation = 0;
    
  let pipe_gap = 35;
  function create_pipe() {
    if (game_state != 'Play') return;

    if (pipe_separation > 115) {
      pipe_separation = 0
        
      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite = document.createElement('div');
      pipe_sprite.className = 'pipe_sprite';
      pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
      pipe_sprite.style.left = '100vw';
      pipe_sprite.increase_score = '1';
        
      document.body.appendChild(pipe_sprite);
    }
    pipe_separation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}

/*
  let magnet_separation = 0;

  let magnet_gap = 35;
  function create_magnet() {
    if (game_state != 'Play') return;

    if (magnet_separation > 115) {
      magnet_separation = 0;
    
    let magnet_posi = Math.floor(Math.random() * 43) + 8;
    let magnet_sprite = document.createElement('div');
    magnet_sprite.className = 'magnet_sprite';
    magnet_sprite.style.top = magnet_posi + magnet_gap + 'vh';
    magnet_sprite.style.left = '100vw';
    magnet_sprite.increase_score = '1';
      
    document.body.appendChild(magnet_sprite);
    }
  magnet_separation++;
  requestAnimationFrame(create_magnet);
}
requestAnimationFrame(create_magnet);
}
*/
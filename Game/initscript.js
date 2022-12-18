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
    
let game_state = 'Start';
let spring_init_pos = document.body.getBoundingClientRect()

function game_start(){
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
          score_title.innerHTML = 'Jumps : ';
          score_val.innerHTML = '0';
          play();
        }
      });
}

game_start();
function play() {
  function move() {
      
    if (game_state != 'Play') return;
      
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
  
  let pipe_seperation = 0;
    
  let pipe_gap = 35;
  function create_pipe() {
    if (game_state != 'Play') return;

    if (pipe_seperation > 115) {
      pipe_seperation = 0
        
      let pipe_posi = Math.floor(Math.random() * 30) +10;
      let pipe_sprite = document.createElement('div');
      pipe_sprite.className = 'pipe_sprite';
      pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
      pipe_sprite.style.left = '100vw';
      pipe_sprite.increase_score = '1';
        
      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
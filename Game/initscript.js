let move_speed = 4;

var minGravity = 0.3;
var maxGravity = 0.7;

let gravity = 0.3

let spring = document.querySelector(".spring");
let spring_sound = new Audio();
spring_sound.src = "./assets/Spring_Sound.mp3"

let spring_props = spring.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();

let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let game_state = "Start";

// Add an eventlistener for key presses
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    spring.style.top = "40vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score: ";
    score_val.innerHTML = "0";
    play();
  }
});
function play() {
  function move() {
    if (game_state != "Play") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      spring_props = spring.getBoundingClientRect();

      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (
          spring_props.left <
          pipe_sprite_props.left + pipe_sprite_props.width &&
          spring_props.left + spring_props.width > pipe_sprite_props.left &&
          spring_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          spring_props.top + spring_props.height > pipe_sprite_props.top
        ) {
          game_state = "End";
          message.innerHTML = "Press Enter To Restart";
          message.style.left = "28vw";
          return;
        } else {
          element.style.left = pipe_sprite_props.left - move_speed + "px";
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let spring_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    spring_dy = spring_dy + gravity;
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        score_val.innerHTML = +score_val.innerHTML + 1;
        gravity = Math.random() * (maxGravity - minGravity) + minGravity;
        spring_sound.play()
        spring_dy = -7.6;
      }
    });

    if (spring_props.top <= 0 || spring_props.bottom >= background.bottom) {
      game_state = "End";
      
      location.reload()
      return;
    }
    spring.style.top = spring_props.top + spring_dy + "px";
    spring_props = spring.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  let pipe_gap = 25;
  function create_pipe() {
    if (game_state != "Play") return;

    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}

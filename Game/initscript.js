//global variables
let move_speed = 3;
let gravity = 1;

//related to spring dickson
let spring_dickson = document.querySelector('.springDickson');
let spring_bounding_box = spring_dickson.getBoundingClientRect();

let background = document.querySelector('.gif_background');
let score_val = document.querySelector('.score_val');
let start_message = document.querySelector('.main_screen');
let score_title = document.querySelector('score_title');

let game_state = 'Start';

document.addEventListener('keydown', (e) =>{

    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe').forEach((e)=>{
            e.remove;
        });
        spring_dickson.style.top = '40vh';
        game_state = 'Play';

        start_message.innerHTML ='';

        score_title.innerHTML = 'Jumps:';
        score_val.innerHTML = '0';

        play();
    }

});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let pipe = document.querySelectorAll('.pipe');
        pipe.forEach((element) =>{
            let pipe_bounding_box = element.getBoundingClientRect();
            let dickson_bounding_box = spring_dickson.getBoundingClientRect();

            if(pipe_bounding_box.right <= 0){
                element.remove;
            }
            else{
                if(dickson_bounding_box.left < pipe_bounding_box.left + pipe_bounding_box.width && dickson_bounding_box.left + dickson_bounding_box.width > pipe_bounding_box.left && dickson_bounding_box.top < pipe_bounding_box.top + pipe_bounding_box.height && dickson_bounding_box.top + dickson_bounding_box.height > pipe_bounding_box.top){
                    game_state = 'End'
                    start_message.innerHTML = 'Press Enter to Restart';
                    start_message.style.left = '28vw';
                    return;
                }
                else{
                    if(pipe_bounding_box.right < dickson_bounding_box.left &&pipe_bounding_box.right + move_speed >= dickson_bounding_box.left && element.increase_score == '1'){
                        score_val.innerHTML = +score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_bounding_box.left - move_speed + 'px';
                }
            }
        });

        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let spring_dy = 0;

    function apply_gravity(){
        if(game_state != 'Play') return;
        spring_dy = spring_dy + gravity;
        document.addEventListener('keydown', (e) =>{
            if(e.key == 'ArrowUp' || e.key == ' '){
                spring_dy= -7.6
            }
        });

        if(spring_bounding_box.top <= 0 || spring_bounding_box.bottom >= background.bottom){
            game_state = 'End';
            start_message.innerHTML = 'Press Enter to Restart';
            start_message.style.left = '28vw';
            return;
        }
        spring_dickson.style.top = spring_bounding_box.top + spring_dy + 'px';
        spring_bounding_box = spring_dickson.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_space = 0;
    let magnet_space = 0;

    let pipe_gap = 35;
    let magnet_gap = 70;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_space > 115){
            pipe_space = 0;

            let pipe_pos = Math.floor(Math.random() * 43 + 8);

            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_pos + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_space++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
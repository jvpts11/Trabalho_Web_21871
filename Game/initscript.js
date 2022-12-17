//global variables
let move_speed = 3;
let gravity = 1;

alert("teste")

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
            dickson_bounding_box = spring_dickson.getBoundingClientRect();

            if(pipe_bounding_box.right <= 0){
                element.remove;
            }
            else{
                if(dickson_bounding_box.left < pipe_bounding_box.left + pipe_bounding_box.width && dickson_bounding_box.left + dickson_bounding_box.width > pipe_bounding_box.left && dickson_bounding_box.top < pipe_bounding_box.top + pipe_bounding_box.height && dickson_bounding_box.top + dickson_bounding_box.height > pipe_bounding_box.top){
                    game_state = 'End'
                    start_message.innerHTML = 'Press Enter to Restart';
                    start_message.style.left = '28vw';
                }
            }
        });
    }
}
var gravity = -0.01;
var player_speed_x = 0;
var player_speed_y = 0;
var player_speed_z = 0;
var res = 0.01;

function update_physics() {
    move(cam_pos, right, 1, player_speed_x);
    move(cam_pos, up, 1, player_speed_y);
    move(cam_pos, forward, 1, player_speed_z);
    //console.log(player_speed);
    if (!move_down) {
        player_speed_x = 0;
        player_speed_y = 0;
        player_speed_z = 0;
    } else player_speed_y += gravity;

    if (!move_up && player_speed_y > 0) player_speed_y = 0;
    if (!move_left && player_speed_y < 0) player_speed_x = 0;
    if (!move_right && player_speed_y > 0) player_speed_x = 0;
    if (!move_forward && player_speed_z < 0) player_speed_z = 0;
    if (!move_backward && player_speed_z > 0) player_speed_z = 0;
}

var move_right = true;
var move_left = true;
var move_up = true;
var move_down = true;
var move_forward = true;
var move_backward = true;

function collide_all () {
    move_right = true;
    move_left = true;
    move_up = true;
    move_down = true;
    move_forward = true;
    move_backward = true;
    for (var i = 0; i < obj_array.length; i++) {
        obj_array[i].collide();
        if (move_right && !obj_array[i].move_right) move_right = false;
        if (move_left && !obj_array[i].move_left) move_left = false;
        if (move_up && !obj_array[i].move_up) move_up = false;
        if (move_down && !obj_array[i].move_down) move_down = false;
        if (move_forward && !obj_array[i].move_forward) move_forward = false;
        if (move_backward && !obj_array[i].move_backward) move_backward = false;
    }
}
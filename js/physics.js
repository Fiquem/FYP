var gravity = -0.01;
var player_speed = 0;

function update_physics() {
    move(cam_pos, up, 1, player_speed);
    //console.log(player_speed);
    if (!move_down) {
        player_speed = 0;
    } else player_speed += gravity;
}

function Object(width, height, depth, x, y, z, move_right, move_left, move_up, move_down, move_forward, move_backward) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.x = x;
    this.y = y;
    this.z = z;
    this.move_right = true;
    this.move_left = true;
    this.move_up = true;
    this.move_down = true;
    this.move_forward = true;
    this.move_backward = true;
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
        collide(obj_array[i]);
        if (move_right && !obj_array[i].move_right) move_right = false;
        if (move_left && !obj_array[i].move_left) move_left = false;
        if (move_up && !obj_array[i].move_up) move_up = false;
        if (move_down && !obj_array[i].move_down) move_down = false;
        if (move_forward && !obj_array[i].move_forward) move_forward = false;
        if (move_backward && !obj_array[i].move_backward) move_backward = false;
    }
}

function collide (obj) {
    if (is_collision(obj) && cam_pos[0] < obj.x-(obj.width/2)) obj.move_right = false;
    else obj.move_right = true;
    if (is_collision(obj) && cam_pos[0] > obj.x+(obj.width/2)) obj.move_left = false;
    else obj.move_left = true;
    if (is_collision(obj) && cam_pos[1] < obj.y-(obj.height/2)) obj.move_up = false;
    else obj.move_up = true;
    if (is_collision(obj) && cam_pos[1] > obj.y+(obj.height/2)) obj.move_down = false;
    else obj.move_down = true;
    if (is_collision(obj) && cam_pos[2] < obj.z-(obj.depth/2)) obj.move_forward = false;
    else obj.move_forward = true;
    if (is_collision(obj) && cam_pos[2] > obj.z+(obj.depth/2)) obj.move_backward = false;
    else obj.move_backward = true;
}

function is_collision(obj) {
    if (cam_pos[0] + 0.5 > obj.x - (obj.width/2) &&
            cam_pos[0] - 0.5 < obj.x + (obj.width/2) &&
            cam_pos[1] + 0.5 > obj.y - (obj.height/2) &&
            cam_pos[1] - 0.5 < obj.y + (obj.height/2) &&
            cam_pos[2] + 0.5 > obj.z - (obj.depth/2) &&
            cam_pos[2] - 0.5 < obj.z + (obj.depth/2))
        return true;
    else return false;
}
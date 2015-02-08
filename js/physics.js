var gravity = -0.01;
var player_speed = 0;

function update_physics() {
    move(cam_pos, up, 1, player_speed);
    if (!move_down) {
        player_speed = 0;
    } else player_speed += gravity;
}

function Object(width, height, depth, x, y, z) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.x = x;
    this.y = y;
    this.z = z;
}

var move_right = true;
var move_left = true;
var move_up = true;
var move_down = true;
var move_forward = true;
var move_backward = true;

function collide (obj) {
    if (is_collision(obj) && cam_pos[0] < obj.x-(obj.width/2)) move_right = false;
    else move_right = true;
    if (is_collision(obj) && cam_pos[0] > obj.x+(obj.width/2)) move_left = false;
    else move_left = true;
    if (is_collision(obj) && cam_pos[1] < obj.y-(obj.height/2)) move_up = false;
    else move_up = true;
    if (is_collision(obj) && cam_pos[1] > obj.y+(obj.height/2)) move_down = false;
    else move_down = true;
    if (is_collision(obj) && cam_pos[2] < obj.z-(obj.depth/2)) move_forward = false;
    else move_forward = true;
    if (is_collision(obj) && cam_pos[2] > obj.z+(obj.depth/2)) move_backward = false;
    else move_backward = true;
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
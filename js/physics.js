var gravity = -0.01;
var player_speed = 0;

function update_physics() {
    cam_pos[1] += player_speed;
    if (cam_pos[1] <= 1) {
        player_speed = 0;
    } else player_speed += gravity;
}
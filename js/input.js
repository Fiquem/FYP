var keys_down = {};
var speed = 0.1;
var x,y;

function handleKeyDown(event) {
    keys_down[event.keyCode] = true;
}

function handleKeyUp(event) {
    keys_down[event.keyCode] = false;
    //console.log(event.keyCode);
}

function handleMouseMovement(event) {
    x = event.clientX;
    y = event.clientY;
    if (keys_down[16])
    {
        yaw += (x - last_x)*speed;
        if ((pitch < 20 && (y - last_y) > 0) || (pitch > -20 && (y - last_y) < 0)) pitch += (y - last_y)*speed;
    }
    if (yaw > 360) yaw = 0;
    last_x = x;
    last_y = y;
}

function handleKeys() {
    // WASD - cam move
    if (keys_down[87])
        move(cam_pos, forward, 1, 0.1);
    if (keys_down[65])
        move(cam_pos, right, -1, 0.1);
    if (keys_down[83])
        move(cam_pos, forward, -1, 0.1);
    if (keys_down[68])
        move(cam_pos, right, 1, 0.1);

    // SPACE - Jump!
    if (keys_down[32])
        if (cam_pos[1] <= 1) player_speed = 0.2;
}

function move (obj, axis, dir, speed) {
	if (((dir * axis[0] * speed) > 0 && move_right) || ((dir * axis[0] * speed) < 0 && move_left)) obj[0] += dir * axis[0] * speed;
	if (((dir * axis[1] * speed) > 0 && move_up) || ((dir * axis[1] * speed) < 0 && move_down)) obj[1] += dir * axis[1] * speed;
	if (((dir * axis[2] * speed) > 0 && move_forward) || ((dir * axis[2] * speed) < 0 && move_backward)) obj[2] += dir * axis[2] * speed;
}
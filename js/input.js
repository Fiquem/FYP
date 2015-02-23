var keys_down = {};
var speed = 0.1;
var x,y;

function handleKeyDown(event) {
    var code = event.keyCode || event.key;
    keys_down[code] = true;
}

function handleKeyUp(event) {
    var code = event.keyCode || event.key;
    keys_down[code] = false;
    //console.log(event.keyCode);
}

function handleMouseMovement(e) {
    x = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;
    y = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;

    yaw += x*speed;
    if ((pitch < 90 && y > 0) || (pitch > -90 && y < 0)) pitch += y*speed;
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
        if (!move_down) {
            player_speed_y = 0.2;
            move_down = true; // This makes things not glitchy af!
        }
}

function move (obj, axis, dir, speed) {
	if (((dir * axis[0] * speed) > 0 && move_right) || ((dir * axis[0] * speed) < 0 && move_left))
		obj[0] += dir * axis[0] * speed;
	if (((dir * axis[1] * speed) > 0 && move_up) || ((dir * axis[1] * speed) < 0 && move_down))
		obj[1] += dir * axis[1] * speed;
	if (((dir * axis[2] * speed) > 0 && move_forward) || ((dir * axis[2] * speed) < 0 && move_backward))
		obj[2] += dir * axis[2] * speed;
}
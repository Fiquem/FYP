var keys_down = {};
var speed = 0.1;
var x,y;

function handleKeyDown(event) {
    keys_down[event.keyCode] = true;
}

function handleKeyUp(event) {
    keys_down[event.keyCode] = false;
    console.log(event.keyCode);
}

function handleMouseMovement(event) {
    x = event.clientX;
    y = event.clientY;
    if (keys_down[16])
    {
        yaw += (x - last_x)*speed;
        if ((pitch < 20 && (y - last_y) > 0) || (pitch > -20 && (y - last_y) < 0)) pitch += (y - last_y)*speed;
        cam_orient = mult_quat_quat (quat_from_axis_deg ((x - last_x)*speed, up[0], up[1], up[2]), cam_orient);
        cam_orient = mult_quat_quat (quat_from_axis_deg ((y - last_y)*speed, right[0], right[1], right[2]), cam_orient);
    }
    if (yaw > 360) yaw = 0;
    last_x = x;
    last_y = y;
}

function handleKeys() {
    // WASD - cam move
    if (keys_down[87])
        //cam_pos[2] -= speed;
        move(cam_pos, forward, 1, 0.1);
    if (keys_down[65])
        //cam_pos[0] -= speed;
        move(cam_pos, right, -1, 0.1);
    if (keys_down[83])
        //cam_pos[2] += speed;
        move(cam_pos, forward, -1, 0.1);
    if (keys_down[68])
        //cam_pos[0] += speed;
        move(cam_pos, right, 1, 0.1);
}

function move (obj, axis, dir, speed) {
	obj[0] += dir * axis[0] * speed;
	obj[1] += dir * axis[1] * speed;
	obj[2] += dir * axis[2] * speed;
}
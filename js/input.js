var keys_down = {};

function handleKeyDown(event) {
    keys_down[event.keyCode] = true;
}

function handleKeyUp(event) {
    keys_down[event.keyCode] = false;
    //console.log(event.keyCode);
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

    // IJKL - cam rotate
    if (keys_down[73])
	 cam_orient = mult_quat_quat (quat_from_axis_deg (-1, right[0], right[1], right[2]), cam_orient);
    if (keys_down[74])
	 cam_orient = mult_quat_quat (quat_from_axis_deg (-1, up[0], up[1], up[2]), cam_orient);
    if (keys_down[75])
	 cam_orient = mult_quat_quat (quat_from_axis_deg (1, right[0], right[1], right[2]), cam_orient);
    if (keys_down[76])
	 cam_orient = mult_quat_quat (quat_from_axis_deg (1, up[0], up[1], up[2]), cam_orient);
    /*if (keys_down[79])
	 cam_orient = mult_quat_quat (quat_from_axis_deg (-1, forward[0], forward[1], forward[2]), cam_orient);
    if (keys_down[85])
	 cam_orient = mult_quat_quat (quat_from_axis_deg (1, forward[0], forward[1], forward[2]), cam_orient);*/
}

function move (obj, axis, dir, speed) {
	obj[0] += dir * axis[0] * speed;
	obj[1] += dir * axis[1] * speed;
	obj[2] += dir * axis[2] * speed;
}
// All the variables
var cam_pos = [0.0, 1.0, -1.0]; // don't start at zero, or we will be too close

// Free camera thing
var cam_orient = [0.0,0.0,1.0,0.0];
var right = [1,0,0];
var up = [0,1,0];
var forward = [0,0,-1];

// QUAT CODE
var axis = inverse_mat4(quat_to_mat4(cam_orient));
var view_mat = mult_mat4_mat4 (
	quat_to_mat4 (cam_orient), 
	translate_mat4 (identity_mat4(), [-cam_pos[0], -cam_pos[1], -cam_pos[2]])
	);

function update_cam() {
    axis = inverse_mat4 (quat_to_mat4 (cam_orient));
    right = mult_mat4_mat4 (axis, [1.0, 0.0, 0.0, 0.0]);
    up = mult_mat4_mat4 (axis, [0.0, 1.0, 0.0, 0.0]);
    forward = mult_mat4_mat4 (axis, [0.0, 0.0, -1.0, 0.0]);

    // constrain camera
    right[1] = 0.0;
    up = [0.0,1.0,0.0];
    forward[1] = 0.0;

    view_mat = mult_mat4_mat4 (
	quat_to_mat4 (cam_orient), 
	translate_mat4 (identity_mat4(), [-cam_pos[0], -cam_pos[1], -cam_pos[2]])
	);
}
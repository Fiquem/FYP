// All the variables
var cam_pos = [0.0, 1.0, -1.0]; // don't start at zero, or we will be too close

// Free camera thing
var cam_orient = [0.0,0.0,1.0,0.0];
var right = [1,0,0];
var up = [0,1,0];
var forward = [0,0,-1];
var pitch = 0;
var yaw = 180;

function update_cam() {
    // UH
    forward = [Math.sin(ONE_DEG_IN_RAD*yaw),0,-Math.cos(ONE_DEG_IN_RAD*yaw)];
    right = [Math.cos(ONE_DEG_IN_RAD*yaw),0,Math.sin(ONE_DEG_IN_RAD*yaw)];

    // pitch * yaw * translation
    view_mat = mult_mat4_mat4 (
	mult_mat4_mat4 (
		rotate_x_deg (identity_mat4 (), pitch),
		rotate_y_deg (identity_mat4 (), yaw)
		),
	translate_mat4 (identity_mat4(), [-cam_pos[0], -cam_pos[1], -cam_pos[2]])
	);
}
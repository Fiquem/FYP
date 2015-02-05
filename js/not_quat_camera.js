// All the variables
var cam_pos = [0.0, 1.0, -1.0]; // don't start at zero, or we will be too close

// Free camera thing
var pitch = 0;
var yaw = 0;

function update_cam() {
    // yaw * pitch * translation
    view_mat = mult_mat4_mat4 (
	mult_mat4_mat4 (
		rotate_y_deg (identity_mat4 (), -yaw),
		rotate_x_deg (identity_mat4 (), -pitch)
		), 
	translate_mat4 (identity_mat4(), [-cam_pos[0], -cam_pos[1], -cam_pos[2]])
	);
}
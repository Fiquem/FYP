function Plane(width, height, depth, x, y, z, move_right, move_left, move_up, move_down, move_forward, move_backward) {
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
    this.collide = function() {
        if (this.is_collision() && cam_pos[0] < this.x-(this.width/2)) this.move_right = false;
        else this.move_right = true;
        if (this.is_collision() && cam_pos[0] > this.x+(this.width/2)) this.move_left = false;
        else this.move_left = true;
        if (this.is_collision() && cam_pos[1] < this.y-(this.height/2)) this.move_up = false;
        else this.move_up = true;
        if (this.is_collision() && cam_pos[1] > this.y+(this.height/2)) this.move_down = false;
        else this.move_down = true;
        if (this.is_collision() && cam_pos[2] < this.z-(this.depth/2)) this.move_forward = false;
        else this.move_forward = true;
        if (this.is_collision() && cam_pos[2] > this.z+(this.depth/2)) this.move_backward = false;
        else this.move_backward = true;
    };
    this.is_collision = function() {
        if (cam_pos[0] + 0.5 > this.x - (this.width/2) &&
                cam_pos[0] - 0.5 < this.x + (this.width/2) &&
                cam_pos[1] + 0.5 > this.y - (this.height/2) &&
                cam_pos[1] - 0.5 < this.y + (this.height/2) &&
                cam_pos[2] + 0.5 > this.z - (this.depth/2) &&
                cam_pos[2] - 0.5 < this.z + (this.depth/2))
            return true;
        else return false;
    };
}

function Jump_Pad(width, height, depth, x, y, z, vel, move_right, move_left, move_up, move_down, move_forward, move_backward, jump) {
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
    this.jump = false;
    this.collide = function() {
        if (this.is_collision() && cam_pos[0] < this.x-(this.width/2)) this.move_right = false;
        else this.move_right = true;
        if (this.is_collision() && cam_pos[0] > this.x+(this.width/2)) this.move_left = false;
        else this.move_left = true;
        if (this.is_collision() && cam_pos[1] < this.y-(this.height/2)) this.move_up = false;
        else this.move_up = true;
        if (this.is_collision() && cam_pos[1] > this.y+(this.height/2)) this.move_down = false;
        else this.move_down = true;
        if (this.is_collision() && cam_pos[2] < this.z-(this.depth/2)) this.move_forward = false;
        else this.move_forward = true;
        if (this.is_collision() && cam_pos[2] > this.z+(this.depth/2)) this.move_backward = false;
        else this.move_backward = true;
        if (!this.move_down) {
           player_speed_x = vel[0];
           player_speed_y = vel[1];
           player_speed_z = vel[2];
           this.move_down = true;
        }
    };
    this.is_collision = function() {
        if (cam_pos[0] + 0.5 > this.x - (this.width/2) &&
                cam_pos[0] - 0.5 < this.x + (this.width/2) &&
                cam_pos[1] + 0.5 > this.y - (this.height/2) &&
                cam_pos[1] - 0.5 < this.y + (this.height/2) &&
                cam_pos[2] + 0.5 > this.z - (this.depth/2) &&
                cam_pos[2] - 0.5 < this.z + (this.depth/2))
            return true;
        else return false;
    };
}
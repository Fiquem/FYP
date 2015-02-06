<?php

$vs = file_get_contents("../shaders/basic.vert");
$vs = str_replace("\n","",$vs);
$fs = file_get_contents("../shaders/basic.frag");
$fs = str_replace("\n","",$fs);

$test_obj = file_get_contents("../meshes/Test.obj");
$test_obj = explode("\n",$test_obj);
$test_obj = json_encode($test_obj);
$cow_obj = file_get_contents("../meshes/SPACECOW.obj");
$cow_obj = explode("\n",$cow_obj);
$cow_obj = json_encode($cow_obj);
$ground_obj = file_get_contents("../meshes/ground.obj");
$ground_obj = explode("\n",$ground_obj);
$ground_obj = json_encode($ground_obj);

?>

var gl;
var sp;
var canvas;
var M, V, P;
var M_loc, V_loc, P_loc;
var tex, tex2;
var img = "textures/ground.png";
var img2 = "textures/Capture6.PNG";
var canvas_left, canvas_right, canvas_top, canvas_bottom, last_x, last_y;
var canvas_w = 800;
var canvas_h = 800;

function getShader(gl, script, type) {
    var shaderScript = script;

    var shader;
    if (type == "frag") shader = gl.createShader(gl.FRAGMENT_SHADER);
    else if (type == "vert") shader = gl.createShader(gl.VERTEX_SHADER);
    else return null;

    gl.shaderSource(shader, shaderScript);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function main() {
    canvas = document.getElementById("canvas01");
    canvas_left = canvas.getBoundingClientRect().left;
    canvas_right = canvas.getBoundingClientRect().right;
    canvas_top = canvas.getBoundingClientRect().top;
    canvas_bottom = canvas.getBoundingClientRect().bottom;
    last_x = (canvas_left+canvas_right)/2
    last_y = (canvas_top+canvas_bottom)/2

    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    tex = create_texture_from_file (img);
    tex2 = create_texture_from_file (img2);

    var fragmentShader = getShader(gl, "<?php echo $fs ?>", "frag");
    var vertexShader = getShader(gl, "<?php echo $vs ?>", "vert");
    sp = gl.createProgram();
    gl.attachShader(sp, vertexShader);
    gl.attachShader(sp, fragmentShader);
    gl.bindAttribLocation (sp, 0, "vp");
    gl.bindAttribLocation (sp, 1, "vt");
    gl.bindAttribLocation (sp, 2, "vn");
    gl.linkProgram (sp);
    if (!gl.getProgramParameter(sp, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
    M_loc = gl.getUniformLocation (sp, "M");
    P_loc = gl.getUniformLocation (sp, "P");
    V_loc = gl.getUniformLocation (sp, "V");

    gl.cullFace (gl.BACK);
    gl.frontFace (gl.CCW);
    //gl.enable (gl.CULL_FACE);
    gl.enable (gl.DEPTH_TEST);

    gl.clearColor(0.7, 0.7, 0.7, 1.0);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    document.onmousemove = handleMouseMovement;

    main_loop();
}

function main_loop () {
    gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var time = Date.now() % 10000;
    var angleInDegrees = (360.0 / 10000.0) * time;
    var angleInRadians = angleInDegrees / 57.2957795;

    handleKeys();
    update_cam();

    gl.useProgram (sp);

    parse_obj_into_vbos ( <?php echo $cow_obj; ?> );
    M = scale (identity_mat4(), [0.01,0.01,0.01]);
    M = rotate_y_deg (M, angleInDegrees);
    M = translate_mat4 (M, [-1.0, 0.0, 5.0]);
    V = view_mat;
    P = perspective (45.0, 1.0, 0.1, 100.0);
    gl.uniformMatrix4fv (M_loc, gl.FALSE, new Float32Array (M));
    gl.uniformMatrix4fv (V_loc, gl.FALSE, new Float32Array (V));
    gl.uniformMatrix4fv (P_loc, gl.FALSE, new Float32Array (P));
    draw (tex2);

    parse_obj_into_vbos ( <?php echo $ground_obj; ?> );
    M = scale (identity_mat4 (), [10,10,10]);
    V = view_mat;
    P = perspective (45.0, 1.0, 0.1, 100.0);
    gl.uniformMatrix4fv (M_loc, gl.FALSE, new Float32Array (M));
    gl.uniformMatrix4fv (V_loc, gl.FALSE, new Float32Array (V));
    gl.uniformMatrix4fv (P_loc, gl.FALSE, new Float32Array (P));
    draw (tex);

    window.requestAnimationFrame (main_loop, canvas);
}

function draw (texture) {
    gl.useProgram (sp);
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, texture);
    gl.bindBuffer (gl.ARRAY_BUFFER, vbo_vp);
    gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer (gl.ARRAY_BUFFER, vbo_vt);
    gl.vertexAttribPointer (1, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer (gl.ARRAY_BUFFER, vbo_vn);
    gl.vertexAttribPointer (2, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray (0);
    gl.enableVertexAttribArray (1);
    gl.enableVertexAttribArray (2);
    gl.drawArrays (gl.TRIANGLES, 0, pc);
    gl.disableVertexAttribArray (0);
    gl.disableVertexAttribArray (1);
    gl.disableVertexAttribArray (2);
}

attribute vec3 vp;
attribute vec2 vt;
attribute vec3 vn;

uniform mat4 M, V, P;

varying vec2 st;
varying vec3 n, p;

void main () {
	st = vt;
	n = vec3 (V * M * vec4 (vn, 0.0));
	p = vec3 (V * M * vec4 (vp, 1.0));
	gl_Position = P * V * M * vec4 (vp, 1.0);
}
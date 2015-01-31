precision mediump float;

varying vec2 st;
varying vec3 n, p;
uniform sampler2D dm;

void main(void) {
    vec4 texel = texture2D (dm, st);
    gl_FragColor = texel;
}
export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.z += sin(uTime + length(modelPosition.xy)) * 4.;
  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`
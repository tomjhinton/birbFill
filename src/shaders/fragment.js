export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float noise;

float PI = 3.142;
  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 

vec2 rotateTilePattern(vec2 _st){

  float t = (uTime * .25)  ;
  
    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
  
   if(index == 0.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5 +(t *.8));
    }
  
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5 +t);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5 -t);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI - (t * .8));
    }

    return _st;
}



void main() {
  vec2 uv = vUv;

  // uv = fract(uv * 20.);

  uv = rotateTilePattern(uv);
  // uv = rotateTilePattern(uv);
  

  vec4 tex = texture2D(uTexture, uv);




  vec3 color = tex.rgb;

  float alpha =1.;

  if(color == vec3(0.)){
    alpha = 0.;
  }

  if(color != vec3(0.)){
    color = vec3(uv.x, uv.y, 1.);
    coswarp(color, 3.);
  }
  
// vec3 color = vec3(uv.x);
  



  gl_FragColor = vec4(color, alpha);
}`
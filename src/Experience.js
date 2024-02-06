import { OrbitControls , shaderMaterial, Center, Text, Float} from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as p5 from 'p5';


const sketch = (p) => {

    const order = 5;
let N;
let total;

let path = [];

let counter = 0;
    p.setup = () => {
        p.createCanvas(2000, 2000);
        p.background(220,220,220);
        p.frameRate(48); 


        N = p.int(p.pow(2, order));
  total = N * N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = 2000 / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
    };

     p.draw= () =>  {
        p.background(0);
      
        p.stroke(255);
        
        p.noFill();
          if(counter < path.length ){
        for (let i = 1; i < counter; i++) {
            p.strokeWeight(i*.001);
            p.stroke( 255);
            p.line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
        }
          }
        //endShape();
      
        counter += 1;
        if (counter >= path.length) {
          counter = 0;
        }
      
       
      }
      
      
      function hilbert(i) {
        const points = [
          new p5.Vector(0, 0),
          new p5.Vector(0, 2),
          new p5.Vector(1, 1),
          new p5.Vector(1, 0)
        ];
      
        let v = points[i % 4]; // Use modulus operator to get the remainder of i divided by 4
      
        for (let j = 1; j < order; j++) {

            
          i = Math.floor(i / 4); // Use division operator to get the quotient of i divided by 4
          let index = i % 4; // Use modulus operator to get the remainder of the new i divided by 4
          let len = p.pow(2, j);
          if (index == 0) {
            let temp = v.x;
            v.x = v.y;
            v.y = temp;
          } else if (index == 1) {
            v.y += len;
          } else if (index == 2) {
            v.x += len;
            v.y += len;
          } else if (index == 3) {
            let temp = len - Math.random() - v.x;
            v.x = len - Math.random() - v.y;
            v.y = temp;
            v.x += len;
          }
        }
        return v;
      }
};

let sketchV = new p5(sketch);



let canvasElement = document.getElementById('defaultCanvas0')


let tex = new THREE.CanvasTexture(canvasElement)
tex.needsPMREMUpdate = true




export default function Experience(){

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
            uTexture: tex
            
        },
        
        vertexShader,
        fragmentShader,
        
        
    )
    extend({PlaneMaterial})
    

const ref = useRef()


useEffect(()=>{
     canvasElement = document.getElementById('defaultCanvas0')


 tex = new THREE.CanvasTexture(canvasElement)
 planeMaterial.current.uTexture = tex;
 tex.needsPMREMUpdate = true

}),[]



// Hold state for hovered and clicked events

const planeMaterial = useRef()



useFrame((state, delta) => {
   
    planeMaterial.current.uTime += delta

    // planeMaterial.current.needsUpdate = true;
   
    // ref.current.rotation.x += (delta * .1)
    tex.needsUpdate = true
//   console.log(planeMaterial)

   

})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

<>
{/* <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/> */}




<mesh
     position={[0, 0, 0]}
      ref={ref}
  
      >
      <boxGeometry  args={[20,20,1, 25, 25, 25  ]}  />
      <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} transparent />
      
    </mesh>

    <Text
        
        font="FerriteCoreDX-Regular.otf"
        scale={1 }
       
        position={ [ .0, -2.250, -4 ] }
        fontSize={1.5}
        
        
        >
          {'Sorry  Mr. Hilbert'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
          />
        </Text>


    
      
      </>
    )
}
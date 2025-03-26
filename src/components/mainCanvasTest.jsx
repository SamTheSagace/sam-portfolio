

import * as THREE from 'three'; 
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import {useGSAP} from "@gsap/react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef, forwardRef, useImperativeHandle, useEffect, } from "react";
import { TextureLoader } from 'three'
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const  MainCanvasTest= forwardRef(() => {


  useGSAP(()=>{
    const timeline = gsap.timeline({
      ScrollTrigger:{
        trigger:'.app',
        scrub:true,
        markers:true,
      }
    })
    if(box.current){
      timeline.to(box.current.rotation, {
       y: Math.PI/2,
      })
    }
  })


  function Room() {
    return (
      <mesh>
        <cylinderGeometry args={[20, 20, 80]} />
        <meshStandardMaterial color={"black"} side={THREE.BackSide} />
      </mesh>
    );
  }
  const box = useRef()
  return (
    <div className="app">
      <Canvas 
        shadows
        dpr={[1,2]}
        camera={{ fov: 35, position: [0, 0, 10] }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <Suspense fallback={null}>            
          <Environment files={"./images/night.jpg"}/>
          {/* <Room/> */}
          <mesh ref={box}>
            <boxGeometry args={[1,1]}/>
            <meshBasicMaterial color={"black"}/>
          </mesh>
          <Screens/>
          {/* <OrbitControls/> */}
        </Suspense>
      </Canvas>
    </div>
  );
});
export default MainCanvasTest


import * as THREE from 'three'; 
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import {useGSAP} from "@gsap/react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef, forwardRef, useImperativeHandle, useEffect, useState, } from "react";
import { TextureLoader } from 'three'
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { cameraPosition } from 'three/src/nodes/TSL.js';
gsap.registerPlugin(ScrollTrigger);

const  MainCanvas= forwardRef((props, ref) => {
  const fullScreens = useRef()
  const orientation = useScreenOrientation().startsWith("landscape") ?  true : false;

  function useScreenOrientation() {
    const [orientation, setOrientation] = useState(window.screen.orientation.type)
    useEffect(() => {
      const handleOrientationChange= () => setOrientation(window.screen.orientation.type);
      window.addEventListener('orientationchange', handleOrientationChange);
      return () => window.removeEventListener('orientationchange', handleOrientationChange);
    }, []);
  
    return orientation;
  }
  

  const mobileOrient = [0,0,Math.PI/2]
  const computerOrient= [0,0,0]
  const computeOrientation = orientation ?  computerOrient : mobileOrient
  
  

    const Screens = ()=>{
      const map1 = useLoader(TextureLoader, `./textures/1.png`)
      const map1Mobile = useLoader(TextureLoader, `./textures/1mobile.png`)
      const map2 = useLoader(TextureLoader, `./textures/2.png`)
      const map2Mobile = useLoader(TextureLoader, `./textures/2mobile.png`)
      const map3 = useLoader(TextureLoader, `./textures/3.png`)
      const map3Mobile = useLoader(TextureLoader, `./textures/3mobile.png`)
      const map4 = useLoader(TextureLoader, `./textures/4.png`)
      const map4Mobile = useLoader(TextureLoader, `./textures/4mobile.png`)
      const map5 = useLoader(TextureLoader, `./textures/5.png`)
      const map5Mobile = useLoader(TextureLoader, `./textures/5mobile.png`)

      const plane = useRef()
      const scale = 1.45
      const initialPosition = [0, 0, 4.80137]
      const initialPositionMobile = [0, 0, 3.03433]
      const planePosition = useScreenOrientation().startsWith("landscape") ? initialPosition : initialPositionMobile
      return(
        <>
          <group position={[0,0,0]} rotation={[0,0,0]}>
            <mesh useRef={plane} position={planePosition} scale={scale} rotation={computeOrientation}>
              <planeGeometry  args={[1.920, 1.080]} />
              <meshStandardMaterial map={orientation ? map1 : map1Mobile}/>
            </mesh>   
          </group>
          <group position={[0,0,0]} rotation={[0,Math.PI/5*2,0]}>
            <mesh useRef={plane} position={planePosition} scale={scale} rotation={computeOrientation}>
              <planeGeometry  args={[1.92, 1.080]} />
              <meshStandardMaterial map={orientation ? map2 : map2Mobile}/>
            </mesh>   
          </group>
          <group position={[0,0,0]} rotation={[0,Math.PI/5*4,0]}>
            <mesh useRef={plane} position={planePosition} scale={scale} rotation={computeOrientation}>
              <planeGeometry  args={[1.92, 1.080]} />
              <meshStandardMaterial map={orientation ? map3 : map3Mobile}/>
            </mesh>   
          </group>
          <group position={[0,0,0]} rotation={[0,Math.PI/5*6,0]}>
            <mesh useRef={plane} position={planePosition} scale={scale} rotation={computeOrientation}>
              <planeGeometry  args={[1.92, 1.080]} />
              <meshStandardMaterial map={orientation ? map4 : map4Mobile}/>
            </mesh>   
          </group>
          <group position={[0,0,0]} rotation={[0,Math.PI/5*8,0]}>
            <mesh useRef={plane} position={planePosition} scale={scale} rotation={computeOrientation}>
              <planeGeometry  args={[1.92, 1.080]} />
              <meshStandardMaterial map={orientation ? map5 : map5Mobile}/>
            </mesh>   
          </group>
        </>
        )
    }

    const Plane = () => {
        const gltf = useLoader(GLTFLoader, "./background_plane.glb");
        return (
        <>
            <primitive object={gltf.scene} position={[1, 0, 0]} scale={2}/>             
        </>
        );
    };  
  const modelsBase = orientation ? "computers" : "mobiles"
    const BaseScreen = () => {      
        
        const gltf = useLoader(GLTFLoader, `./${modelsBase}.glb`);
        return (
        <>
            <primitive object={gltf.scene} position={[0, 0, 0]}/>             
        </>
        );
    };

    function Room() {
      return (
        <mesh>
          <cylinderGeometry args={[20, 20, 80]} />
          <meshStandardMaterial color={"black"} side={THREE.BackSide} />
        </mesh>
      );
    }
  
    const [isAnimating, setIsAnimating] = useState(false);

    function slideLeft() { 
        if (isAnimating) return; // Prevent starting a new animation if one is running
        setIsAnimating(true); 

        const timeline = gsap.timeline({
            onComplete: () => setIsAnimating(false) // Reset flag when animation is done
        });

        timeline.to(fullScreens.current.rotation, {
            y: "+=" + (Math.PI / 5 * 2), // Increment by 36°
            duration: 1
        });
    };

    function slideRight() { 
        if (isAnimating) return; 
        setIsAnimating(true); 

        const timeline = gsap.timeline({
            onComplete: () => setIsAnimating(false)            
        });

        timeline.to(fullScreens.current.rotation, {
            y: "-=" + (Math.PI / 5 * 2), // Decrement by 36°
            duration: 1
        });
    };


    useImperativeHandle(ref, () => ({
        slideLeft,
        slideRight,
    }));
  const cameraPosition = [0, 0, 10]
  const cameraPositionMobile = [0,0, 20]  

  return (
    <div className="app">
      <Canvas 
        shadows
        dpr={[1,2]}
        camera={{ fov: 35, position: cameraPosition }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <Suspense fallback={null}> 
          {/* <camera fov={35} position= {useScreenOrientation().startsWith("landscape") ? cameraPosition : cameraPositionMobile }
            onCreated={({ camera }) => {
              camera.lookAt(0, 0, 0);
            }}
          />            */}
          <Environment files={"./images/night.jpg"}/>
          {/* <Room/> */}
          <pointLight position={[-15, 3, -6]} intensity={80}/>
          <pointLight position={[0, 3, 6]} intensity={100}/>
          <pointLight position={[15, 3, -6]} intensity={80}/>
          <Plane/>
          <group ref={fullScreens} position={[0, -0.1725, 0]}>
            <BaseScreen />
            <Screens/>
          </group>
          <OrbitControls/>
        </Suspense>
      </Canvas>
    </div>
  );
});
export default MainCanvas


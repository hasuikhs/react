import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

// function Mesh() {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.z += 0.01));

//   return (
//     <>
//       <mesh ref={ mesh }>
//         <boxGeometry />
//         <meshBasicMaterial color="#00ff00" />
//       </mesh>
//     </>
//   );
// }

function WebGL() {

  const mesh = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    mesh.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }, [])


  return (
    <div ref={ mesh }>
      {/* <Canvas>
        <Mesh />
      </Canvas> */}
    </div>
  );
}

export default WebGL;
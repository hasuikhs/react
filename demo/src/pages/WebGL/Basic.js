import * as THREE from 'three';
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

function Basic() {

  const target = useRef(null);

  useEffect(() => {
    // 장면/무대
    const scene = new THREE.Scene();
    // 시야각을 가진 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 화면에 그려주는 객체
    // 카메라로 보여주는 장면
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    target.current.appendChild(renderer.domElement);

    // 모양(geometry) + 재질(material) = mesh
    // 3d 모델 각각의 오브젝트를 mesh라 함
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // 카메라를 정면으로 볼때
      // x축: 좌우, 왼쪽 -, 오른쪽 +
      // y축: 상하, 위쪽 +, 아래쪽 -
      // z축: 앞뒤(앞으로 나오면 커지고, 반대면 작아짐(원근법)), 앞쪽 +, 뒤쪽 - 
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }, [])


  return (
    <div ref={ target }>
      {/* <Canvas>
        <Mesh />
      </Canvas> */}
    </div>
  );
}

export default Basic;
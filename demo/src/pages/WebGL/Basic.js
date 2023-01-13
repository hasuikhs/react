import * as THREE from 'three';
import { useLayoutEffect, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useResizeObserver } from '../../hooks/useResizeObserver';

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

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

function Basic() {
  const targetRef = useRef(null);
  const [width, height] = useResizeObserver(targetRef, {
    optimmizeType: 'debounce',
    ms: 10000
  });

  // 장면/무대
  const scene = useMemo(() => new THREE.Scene(), []);

  // 시야각을 가진 카메라
  const camera = useMemo(() => {
    // PerspectiveCamera (원근 카메라)
    return new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // OrthographicCamera (직교 카메라): 객체의 크기가 카메라와의 거리에 관계없이 일정하게 유지, 게임 롤 뷰
    // return new THREE.OrthographicCamera(
    //   -(width / height),
    //   width / height,
    //   1,
    //   -1,
    //   0.1,
    //   1000
    // );
  }, []);

  // 화면에 그려주는 객체
  // 카메라로 보여주는 장면
  const renderer = useMemo(() => new THREE.WebGLRenderer({ antialias: true }), []);

  useLayoutEffect(() => {
    renderer.setSize(width, height);

    targetRef.current.appendChild(renderer.domElement);

    // 모양(geometry) + 재질(material) = mesh
    // 3d 모델 각각의 오브젝트를 mesh라 함
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: '#00ff00'
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    camera.zoom = 0.5;
    // camera.lookAt(0, 0, 0);

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

    return () => {
      if (targetRef.current) {
        targetRef.current.removeChild(renderer.domElement);
      }
    }
  }, []);

  useEffect(() => {
    if (width && height) {
      renderer.setSize(width, height);

      if (camera.aspect) {
        camera.aspect = width / height;
      } else {
        camera.left = - (width / height);
        camera.right = width / height;
      }
      camera.updateProjectionMatrix();
  
    }
  }, [width, height]);


  return (
    <CanvasContainer ref={ targetRef }>
      {/* <Canvas>
        <Mesh />
      </Canvas> */}
    </CanvasContainer>
  );
}

export default Basic;
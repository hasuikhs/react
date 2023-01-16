import * as THREE from 'three';
import { useLayoutEffect, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useResizeObserver } from '../../hooks/useResizeObserver';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: dodgerblue;
`;

function Fog() {
  const targetRef = useRef(null);
  const [width, height] = useResizeObserver(targetRef);

  // 장면/무대
  const scene = useMemo(() => new THREE.Scene(), []);

  // 시야각을 가진 카메라
  const camera = useMemo(() => {
    // PerspectiveCamera (원근 카메라)
    return new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
  const renderer = useMemo(() => new THREE.WebGLRenderer({
    antialias: true, // 이미지 계단 현상
    alpha: true, // 배경 투명 여부
  }), []);

  useLayoutEffect(() => {
    // --------- Renderer ---------
    renderer.setSize(width, height);
    // 디바이스 별로 해상도 밀도 이미지 변경
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // 배경 색상
    renderer.setClearColor('#000000');
    // 배경 투명도 설정, 색상과 투명도의 순서는 이대로 고정

    // --------- Scene ---------
    // renderer 보다 우선순위가 높음
    // 안개 끼는 효과
    scene.fog = new THREE.Fog('blue', 3, 7);

    targetRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight('#FFFFFF', 1);
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 10;
    scene.add(light);

    // --------- Mesh ---------
    // 모양(geometry) + 재질(material) = mesh
    // 3d 모델 각각의 오브젝트를 mesh라 함
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // MeshBasicMaterial <- 빛에 영향을 받지 않음
    // const material = new THREE.MeshBasicMaterial({
    //   color: '#00ff00'
    // });
    const material = new THREE.MeshStandardMaterial({
      color: 'red'
    });

    const cubes = [];
    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = Math.random() * 5 - 2.5;
      cube.position.z = Math.random() * 5 - 2.5;
      
      scene.add(cube);
      cubes.push(cube);
    }

    // --------- Camera ---------
    // camera.position.x = 2;
    camera.position.y = 1;
    camera.position.z = 5;

    let time = Date.now();

    const animate = () => {
      const newTime = Date.now();
      const deltaTime = newTime - time;
      time = newTime;

      cubes.forEach(item => {
        item.rotation.y += deltaTime * 0.001;
      });


      // requestAnimationFrame(animate);
      renderer.setAnimationLoop(animate);

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
    </CanvasContainer>
  );
}

export default Fog;
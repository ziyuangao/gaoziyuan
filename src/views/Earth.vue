<template>
    <div ref="canvasContainer" class="canvas-container"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import earth from "@/assets/earth.jpg";
  import * as THREE from 'three';
  
  const canvasContainer = ref(null);
  
  onMounted(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.value.appendChild(renderer.domElement);
  
    // 加载地球纹理
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(earth);
  
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });
    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);
  
    camera.position.z = 15;
  
    function animate() {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.001;
      earthMesh.rotation.x += 0.00001;
      renderer.render(scene, camera);
    }
  
    animate();
  
    // 处理窗口大小调整
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  });
  </script>
  
  <style scoped>
  .canvas-container {
    width: 100%;
    height: 100%;
  }
  </style>
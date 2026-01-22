<template>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'StarField',
    props: {
      width: {
        type: Number,
        default: 800,
      },
      height: {
        type: Number,
        default: 600,
      },
      starCount: {
        type: Number,
        default: 100,
      },
      speed: {
        type: Number,
        default: 0.1,
      },
    },
    setup(props) {
      const canvas = ref(null);
      let stars = [];
      let animationFrameId = null;
  
      const createStars = () => {
        stars = [];
        for (let i = 0; i < props.starCount; i++) {
          stars.push({
            x: Math.random() * props.width,
            y: Math.random() * props.height,
            radius: Math.random() * 1.5,
            velocity: Math.random() * props.speed,
          });
        }
      };
  
      const drawStars = () => {
        const ctx = canvas.value.getContext('2d');
        ctx.clearRect(0, 0, props.width, props.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, props.width, props.height);
  
        stars.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
  
          star.x -= star.velocity;
  
          if (star.x < 0) {
            star.x = props.width;
            star.y = Math.random() * props.height;
          }
        });
  
        animationFrameId = requestAnimationFrame(drawStars);
      };
  
      onMounted(() => {
        createStars();
        drawStars();
      });
  
      onUnmounted(() => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      });
  
      return {
        canvas,
      };
    },
  };
  </script>
  
  <style scoped>
  canvas {
    display: block;
    height: 100vh;
    width: 100%;
    background-color: black;
  }
  </style>
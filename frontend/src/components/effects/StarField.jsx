import { useEffect, useRef } from 'react';

const StarField = ({
  starCount = 200,
  speed = 0.5,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 1000,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawStar = (star, time) => {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
      const alpha = star.alpha * (0.5 + twinkle * 0.5);
      const scale = 0.5 + twinkle * 0.3;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      // Glow effect for larger stars
      if (star.radius > 1) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 3
        );
        gradient.addColorStop(0, `rgba(124, 58, 237, ${alpha * 0.3})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha * 0.1})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach((star) => {
        // Move stars toward viewer
        star.z -= speed;

        // Reset star when it passes the screen
        if (star.z <= 0) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
          star.z = 1000;
        }

        drawStar(star, time * 0.001);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -10,
      }}
    />
  );
};

export default StarField;

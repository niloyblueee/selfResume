/**
 * LightPillar.jsx
 *
 * Three.js WebGL shader-based light pillar effect component.
 * Creates an animated, rotating volumetric light beam effect.
 *
 * Features:
 * - Adaptive quality (high/medium/low) based on device capability
 * - Automatic mobile detection with performance optimization
 * - Customizable colors, intensity, and animation speed
 * - Optional mouse interactivity
 * - WebGL fallback for unsupported browsers
 *
 * @author Portfolio Project
 */

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './LightPillar.css';

const LightPillar = ({
  /* ═══════════════════════════════════════════════════════════════
     CONFIGURABLE PROPS
     ═══════════════════════════════════════════════════════════════ */
  topColor = '#2c1197',       // Color at top of pillar (deep indigo)
  bottomColor = '#920bd0',    // Color at bottom of pillar (vibrant purple)
  intensity = 1.0,            // Overall brightness multiplier
  rotationSpeed = 0.3,        // Speed of pillar rotation animation
  interactive = false,        // Enable mouse-based rotation control
  className = '',             // Additional CSS classes
  glowAmount = 0.002,         // Glow intensity factor
  pillarWidth = 3.0,          // Width of the light pillar
  pillarHeight = 0.4,         // Height/stretch factor
  noiseIntensity = 0.5,       // Film grain/noise amount
  mixBlendMode = 'screen',    // CSS blend mode for compositing
  pillarRotation = 25,        // Initial rotation angle in degrees
  quality = 'high',           // Render quality: 'high', 'medium', or 'low'
  adaptiveQuality = true      // Auto lower quality on mobile/low-end devices
}) => {

  /* ═══════════════════════════════════════════════════════════════
     REFS AND STATE
     ═══════════════════════════════════════════════════════════════ */
  const containerRef = useRef(null);      // Container DOM element
  const rafRef = useRef(null);            // RequestAnimationFrame ID
  const rendererRef = useRef(null);       // Three.js WebGL renderer
  const materialRef = useRef(null);       // Shader material
  const sceneRef = useRef(null);          // Three.js scene
  const cameraRef = useRef(null);         // Orthographic camera
  const geometryRef = useRef(null);       // Plane geometry
  const mouseRef = useRef(new THREE.Vector2(0, 0));  // Mouse position
  const timeRef = useRef(0);              // Animation time accumulator
  const rotationSpeedRef = useRef(rotationSpeed);    // Rotation speed ref
  const [webGLSupported, setWebGLSupported] = useState(true);  // WebGL support flag

  /* ═══════════════════════════════════════════════════════════════
     WEBGL SUPPORT CHECK
     Detect WebGL capability on mount
     ═══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
    }
  }, []);

  /* ═══════════════════════════════════════════════════════════════
     MAIN EFFECT - THREE.JS SETUP AND ANIMATION
     Initializes the WebGL renderer, shader, and animation loop
     ═══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /* Create Three.js scene and orthographic camera */
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    /* ═══════════════════════════════════════════════════════════════
       DEVICE DETECTION & QUALITY ADJUSTMENT
       Automatically lower quality on mobile/low-end devices
       ═══════════════════════════════════════════════════════════════ */
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    let effectiveQuality = quality;
    if (adaptiveQuality) {
      if (isLowEndDevice && quality === 'high') effectiveQuality = 'medium';
      if (isMobile && quality !== 'low') effectiveQuality = 'low';
    }

    /* Quality presets - iterations, pixel ratio, precision */
    const qualitySettings = {
      low: {
        iterations: 24,           // Fewer ray march steps
        waveIterations: 1,        // Minimal wave complexity
        pixelRatio: 0.5,          // Half resolution
        precision: 'mediump',     // Medium precision floats
        stepMultiplier: 1.5       // Larger steps for speed
      },
      medium: {
        iterations: 40,
        waveIterations: 2,
        pixelRatio: 0.65,
        precision: 'mediump',
        stepMultiplier: 1.2
      },
      high: {
        iterations: 80,           // More ray march steps for detail
        waveIterations: 4,        // Complex wave patterns
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        precision: 'highp',       // High precision floats
        stepMultiplier: 1.0       // Standard step size
      }
    };

    const settings = qualitySettings[effectiveQuality] || qualitySettings.medium;

    /* ═══════════════════════════════════════════════════════════════
       WEBGL RENDERER SETUP
       ═══════════════════════════════════════════════════════════════ */
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,         // No antialiasing for performance
        alpha: true,              // Transparent background
        powerPreference: effectiveQuality === 'high' ? 'high-performance' : 'low-power',
        precision: settings.precision,
        stencil: false,           // No stencil buffer needed
        depth: false              // No depth buffer needed
      });
    } catch (error) {
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(settings.pixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* Helper function to convert hex color to Vec3 */
    const parseColor = hex => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    /* ═══════════════════════════════════════════════════════════════
       VERTEX SHADER
       Pass-through shader for full-screen quad
       ═══════════════════════════════════════════════════════════════ */
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    /* ═══════════════════════════════════════════════════════════════
       FRAGMENT SHADER
       Ray marching volumetric light effect with wave distortion
       ═══════════════════════════════════════════════════════════════ */
    const fragmentShader = `
      precision ${settings.precision} float;

      /* Uniforms passed from JavaScript */
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin;
      uniform float uWaveCos;
      varying vec2 vUv;

      /* Quality-dependent constants */
      const float STEP_MULT = ${settings.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${settings.iterations};
      const int WAVE_ITER = ${settings.waveIterations};

      void main() {
        /* Convert UV to normalized device coordinates */
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        /* Apply initial pillar rotation */
        uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y, uPillarRotSin * uv.x + uPillarRotCos * uv.y);

        /* Ray origin and direction for ray marching */
        vec3 ro = vec3(0.0, 0.0, -10.0);
        vec3 rd = normalize(vec3(uv, 1.0));

        /* Rotation factors - use mouse if interactive, otherwise time-based */
        float rotC = uRotCos;
        float rotS = uRotSin;
        if(uInteractive && (uMouse.x != 0.0 || uMouse.y != 0.0)) {
          float a = uMouse.x * 6.283185;
          rotC = cos(a);
          rotS = sin(a);
        }

        vec3 col = vec3(0.0);
        float t = 0.1;

        /* Ray marching loop */
        for(int i = 0; i < MAX_ITER; i++) {
          vec3 p = ro + rd * t;
          /* Apply rotation to position */
          p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

          vec3 q = p;
          q.y = p.y * uPillarHeight + uTime;

          /* Wave distortion with multiple octaves */
          float freq = 1.0;
          float amp = 1.0;
          for(int j = 0; j < WAVE_ITER; j++) {
            q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
            q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
            freq *= 2.0;
            amp *= 0.5;
          }

          /* Distance field calculation */
          float d = length(cos(q.xz)) - 0.2;
          float bound = length(p.xz) - uPillarWidth;
          /* Smooth minimum for blending */
          float k = 4.0;
          float h = max(k - abs(d - bound), 0.0);
          d = max(d, bound) + h * h * 0.0625 / k;
          d = abs(d) * 0.15 + 0.01;

          /* Color gradient based on height */
          float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
          col += mix(uBottomColor, uTopColor, grad) / d;

          t += d * STEP_MULT;
          if(t > 50.0) break;
        }

        /* Apply glow and normalize */
        float widthNorm = uPillarWidth / 3.0;
        col = tanh(col * uGlowAmount / widthNorm);

        /* Add film grain noise */
        col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;

        gl_FragColor = vec4(col * uIntensity, 1.0);
      }
    `;

    /* Pre-calculate rotation values */
    const pillarRotRad = (pillarRotation * Math.PI) / 180;
    const waveSin = Math.sin(0.4);
    const waveCos = Math.cos(0.4);

    /* ═══════════════════════════════════════════════════════════════
       SHADER MATERIAL
       Create material with all uniforms
       ═══════════════════════════════════════════════════════════════ */
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouseRef.current },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uInteractive: { value: interactive },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uRotCos: { value: 1.0 },
        uRotSin: { value: 0.0 },
        uPillarRotCos: { value: Math.cos(pillarRotRad) },
        uPillarRotSin: { value: Math.sin(pillarRotRad) },
        uWaveSin: { value: waveSin },
        uWaveCos: { value: waveCos }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    /* Create full-screen quad geometry */
    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /* ═══════════════════════════════════════════════════════════════
       MOUSE INTERACTION (Optional)
       Throttled mouse move handler for interactive mode
       ═══════════════════════════════════════════════════════════════ */
    let mouseMoveTimeout = null;
    const handleMouseMove = event => {
      if (!interactive) return;
      if (mouseMoveTimeout) return;
      /* Throttle to ~60fps */
      mouseMoveTimeout = window.setTimeout(() => {
        mouseMoveTimeout = null;
      }, 16);
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);
    };

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    /* ═══════════════════════════════════════════════════════════════
       ANIMATION LOOP
       Frame-limited animation for consistent performance
       ═══════════════════════════════════════════════════════════════ */
    let lastTime = performance.now();
    const targetFPS = effectiveQuality === 'low' ? 30 : 60;
    const frameTime = 1000 / targetFPS;

    const animate = currentTime => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const deltaTime = currentTime - lastTime;

      /* Only render at target frame rate */
      if (deltaTime >= frameTime) {
        timeRef.current += 0.016 * rotationSpeedRef.current;
        const t = timeRef.current;
        /* Update time-based uniforms */
        materialRef.current.uniforms.uTime.value = t;
        materialRef.current.uniforms.uRotCos.value = Math.cos(t * 0.3);
        materialRef.current.uniforms.uRotSin.value = Math.sin(t * 0.3);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = currentTime - (deltaTime % frameTime);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    /* ═══════════════════════════════════════════════════════════════
       RESIZE HANDLER
       Debounced resize for performance
       ═══════════════════════════════════════════════════════════════ */
    let resizeTimeout = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        rendererRef.current.setSize(newWidth, newHeight);
        materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    /* ═══════════════════════════════════════════════════════════════
       CLEANUP
       Dispose all Three.js resources on unmount
       ═══════════════════════════════════════════════════════════════ */
    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) materialRef.current.dispose();
      if (geometryRef.current) geometryRef.current.dispose();

      /* Clear all refs */
      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [webGLSupported, quality, adaptiveQuality]);

  /* ═══════════════════════════════════════════════════════════════
     PROP UPDATE EFFECTS
     Update shader uniforms when props change
     ═══════════════════════════════════════════════════════════════ */

  /* Update rotation speed */
  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  /* Update top color */
  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = hex => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uTopColor.value = parseColor(topColor);
  }, [topColor]);

  /* Update bottom color */
  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = hex => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uBottomColor.value = parseColor(bottomColor);
  }, [bottomColor]);

  /* Update intensity */
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uIntensity.value = intensity;
  }, [intensity]);

  /* Update interactive mode */
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uInteractive.value = interactive;
  }, [interactive]);

  /* Update glow amount */
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uGlowAmount.value = glowAmount;
  }, [glowAmount]);

  /* Update pillar width */
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarWidth.value = pillarWidth;
  }, [pillarWidth]);

  /* Update pillar height */
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarHeight.value = pillarHeight;
  }, [pillarHeight]);

  /* Update noise intensity */
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uNoiseIntensity.value = noiseIntensity;
  }, [noiseIntensity]);

  /* Update pillar rotation */
  useEffect(() => {
    if (!materialRef.current) return;
    const pillarRotRad = (pillarRotation * Math.PI) / 180;
    materialRef.current.uniforms.uPillarRotCos.value = Math.cos(pillarRotRad);
    materialRef.current.uniforms.uPillarRotSin.value = Math.sin(pillarRotRad);
  }, [pillarRotation]);

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  /* Fallback for browsers without WebGL support */
  if (!webGLSupported) {
    return (
      <div className={`light-pillar-fallback ${className}`} style={{ mixBlendMode }}>
        WebGL not supported
      </div>
    );
  }

  /* Main render - container div that Three.js canvas attaches to */
  return <div ref={containerRef} className={`light-pillar-container ${className}`} style={{ mixBlendMode }} />;
};

export default LightPillar;

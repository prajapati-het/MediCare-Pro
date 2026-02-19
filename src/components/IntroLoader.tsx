import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Heart, Activity, Stethoscope, Building2 } from 'lucide-react';
import * as THREE from 'three';

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    sphere: THREE.Mesh;
    rings: THREE.Mesh[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create central sphere with gradient
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4f46e5,
      emissive: 0x3b82f6,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create rotating rings
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(1.2 + i * 0.3, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshPhongMaterial({
        color: i === 0 ? 0x4f46e5 : i === 1 ? 0x3b82f6 : 0x8b5cf6,
        emissive: i === 0 ? 0x4f46e5 : i === 1 ? 0x3b82f6 : 0x8b5cf6,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      rings.push(ring);
      scene.add(ring);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4f46e5, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 2, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    sceneRef.current = { scene, camera, renderer, particles, sphere, rings, animationId: 0 };

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame++;
      
      // Rotate particles
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Pulse sphere
      const scale = 1 + Math.sin(frame * 0.02) * 0.1;
      sphere.scale.set(scale, scale, scale);
      sphere.rotation.y += 0.01;

      // Rotate rings
      rings.forEach((ring, i) => {
        ring.rotation.x += 0.005 * (i + 1);
        ring.rotation.y += 0.008 * (i + 1);
        ring.rotation.z += 0.003 * (i + 1);
      });

      // Camera movement
      camera.position.x = Math.sin(frame * 0.001) * 0.5;
      camera.position.y = Math.cos(frame * 0.002) * 0.3;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      sceneRef.current!.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Stage timers
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 2000),
      setTimeout(() => setStage(4), 2800),
      setTimeout(() => onComplete(), 3800),
    ];

    // Loading progress
    const loadingInterval = setInterval(() => {
      setLoading(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      timers.forEach(clearTimeout);
      clearInterval(loadingInterval);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        if (canvasRef.current?.contains(sceneRef.current.renderer.domElement)) {
          canvasRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Three.js Canvas */}
        <div 
          ref={canvasRef} 
          className="absolute inset-0"
          style={{ filter: 'blur(0px)' }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />

        {/* UI Content */}
        <div className="relative z-10 flex flex-col items-center px-4">
          
          {/* Medical Icons */}
          <motion.div
            className="flex items-center gap-4 md:gap-6 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <motion.div
              animate={{ 
                scale: stage >= 1 ? [1, 1.4, 1.1] : 1,
                rotate: stage >= 1 ? [0, 360, 360] : 0,
              }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
            >
              <div className="p-3 md:p-4 rounded-2xl bg-indigo-500/20 backdrop-blur-xl border border-indigo-400/30 shadow-2xl shadow-indigo-500/50">
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" />
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                scale: stage >= 2 ? [1, 1.4, 1.1] : 1,
                y: stage >= 2 ? [0, -20, 0] : 0,
              }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 120, delay: 0.1 }}
            >
              <div className="p-3 md:p-4 rounded-2xl bg-blue-500/20 backdrop-blur-xl border border-blue-400/30 shadow-2xl shadow-blue-500/50">
                <Activity className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                scale: stage >= 2 ? [1, 1.4, 1.1] : 1,
                rotate: stage >= 2 ? [0, -20, 0] : 0,
              }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 120, delay: 0.15 }}
            >
              <div className="p-3 md:p-4 rounded-2xl bg-purple-500/20 backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-500/50">
                <Stethoscope className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Main Logo */}
          <motion.div
            className="mb-6 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
          >
            <motion.div
              className="p-4 md:p-5 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl relative overflow-hidden"
              animate={{ 
                rotate: stage >= 3 ? [0, 360] : 0,
                scale: stage >= 3 ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              
              <Building2 className="w-12 h-12 md:w-16 md:h-16 text-white relative z-10" />
              
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-white/30"
                animate={{ 
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-white/20"
                animate={{ 
                  scale: [1, 1.8],
                  opacity: [0.3, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
            className="text-center mb-2"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                MediCare Pro
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-indigo-200 text-base md:text-lg mb-10 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Hospital Management System
          </motion.p>

          {/* Loading Bar */}
          <motion.div
            className="w-64 md:w-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full relative"
                style={{ width: `${loading}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
            
            {/* Loading percentage */}
            <motion.div
              className="text-center mt-3 text-white/60 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {loading}%
            </motion.div>
          </motion.div>

          {/* Status text */}
          <motion.div
            className="mt-6 text-indigo-300/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {stage >= 4 && 'Initializing system...'}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
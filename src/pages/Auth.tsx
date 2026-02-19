import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Stethoscope,
  Shield,
  Heart,
} from "lucide-react";
import * as THREE from "three";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  getDoctorMapping,
  getHospitalForAdminHandle,
  normalizeAdminHandle,
  normalizeDoctorHandle,
} from "@/data/userMappings";
import { appendUser, updateLoginMethod } from "@/redux/slices/appSlice";
import { doctorsData } from "@/data/doctorData";
import { AdminType, DoctorType } from "@/types/type";

function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0x8b5cf6, 1);
    directionalLight2.position.set(-5, -3, 3);
    scene.add(directionalLight2);

    const wireframeSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );
    wireframeSphere.position.set(-2, 0, 0);
    scene.add(wireframeSphere);

    const geometryGroup = new THREE.Group();
    
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.3, 16, 100),
      new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      })
    );
    torus.position.set(2, 1, 0);
    geometryGroup.add(torus);

    const icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        metalness: 0.8,
        roughness: 0.3,
        wireframe: true,
      })
    );
    icosahedron.position.set(2, -1.5, 0);
    geometryGroup.add(icosahedron);

    const octahedron = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        metalness: 0.6,
        roughness: 0.4,
        transparent: true,
        opacity: 0.8,
      })
    );
    octahedron.position.set(-2, -2, 0);
    geometryGroup.add(octahedron);

    scene.add(geometryGroup);

    const nodeGroup = new THREE.Group();
    const nodes = [];
    const nodeCount = 15;
    
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 12),
        new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.5,
        })
      );
      
      const theta = (i / nodeCount) * Math.PI * 2;
      const radius = 3;
      node.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta * 2) * 0.5,
        Math.sin(theta) * radius
      );
      
      nodes.push(node);
      nodeGroup.add(node);
    }

    for (let i = 0; i < nodes.length; i++) {
      const nextIndex = (i + 1) % nodes.length;
      const points = [
        nodes[i].position,
        nodes[nextIndex].position
      ];
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.3,
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      nodeGroup.add(line);
    }

    scene.add(nodeGroup);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      wireframeSphere.rotation.x += 0.002;
      wireframeSphere.rotation.y += 0.003;

      torus.rotation.x += 0.003;
      torus.rotation.y += 0.002;

      icosahedron.rotation.x += 0.004;
      icosahedron.rotation.y += 0.003;

      octahedron.rotation.x += 0.002;
      octahedron.rotation.z += 0.003;

      nodeGroup.rotation.y += 0.001;

      particlesMesh.rotation.y += 0.0005;

      const time = Date.now() * 0.0005;
      geometryGroup.position.y = Math.sin(time) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full absolute inset-0" />;
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const usernameRaw = email.split("@")[0].toLowerCase();
    const isAdmin = usernameRaw.endsWith("adm");
    const role: "admin" | "doctor" = isAdmin ? "admin" : "doctor";

    let user: DoctorType | AdminType;
    let hospitalId: string;

    if (role === "admin") {
      const normalized = normalizeAdminHandle(usernameRaw);
      const hospital = getHospitalForAdminHandle(normalized);
      if (!hospital) throw new Error("Invalid admin");

      hospitalId = hospital.id;

      user = {
        id: Date.now(),
        username: normalized,
        email,
        hospital: hospital.id,
        role: "admin",
        status: "active",
        phone: "",
        experience: "",
        education: "",
        licenseNumber: "",
        availableDays: [],
        rating: "",
        picture: undefined,
      };
    } else {
      const normalized = normalizeDoctorHandle(usernameRaw);
      
      const mapping = getDoctorMapping(normalized);
      console.log(mapping)
      if (!mapping) throw new Error("Invalid doctor");

      const doctor = doctorsData.find(d => d.id === mapping.doctorId);
      if (!doctor) throw new Error("Doctor profile not found");

      hospitalId = doctor.hospital;

      user = {
        ...doctor,
        email, 
      };
    }

    dispatch(appendUser({ user }));
    dispatch(updateLoginMethod("email"));

    navigate(role === "admin" ? `/hospitals/${hospitalId}` : "/dashboard");
  } catch {
    toast({
      title: "Authentication failed",
      description: "Invalid credentials",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      console.log("Google login");
      setIsGoogleLoading(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto relative z-10">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <motion.div
                className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building2 className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  MediCare Pro
                </h1>
                <p className="text-sm text-blue-600/70">
                  Hospital Management System
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              {isLogin ? "Welcome back" : "Join MediCare"}
            </h2>
            <p className="text-gray-600">
              {isLogin ? "Continue to your dashboard" : "Create your account today"}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full mb-6 h-12 gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 rounded-lg flex items-center justify-center font-medium shadow-sm"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </motion.div>

          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-gray-700 mb-2 block text-sm font-medium">Full Name</label>
                  <motion.div
                    animate={{ scale: focusedField === "name" ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      className="w-full h-12 px-4 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg outline-none"
                      placeholder="Enter your full name"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <label className="text-gray-700 mb-2 block flex items-center gap-2 text-sm font-medium">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <motion.div
                animate={{ scale: focusedField === "email" ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                  className="w-full h-12 px-4 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg outline-none"
                  placeholder="you@example.com"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-gray-700 mb-2 block flex items-center gap-2 text-sm font-medium">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === "password" ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  required
                  className="w-full h-12 px-4 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg outline-none pr-12"
                  placeholder="••••••••"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </motion.div>
            </motion.div>

            {isLogin && (
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Remember me
                </label>
                <span className="text-sm text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                  Forgot password?
                </span>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <motion.button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </motion.button>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-4 text-gray-500 text-xs">
            <span className="hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer">
              <Shield className="w-3 h-3" />
              Privacy
            </span>
            <span>•</span>
            <span className="hover:text-gray-700 transition-colors cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer">
              <Heart className="w-3 h-3" />
              Support
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/50 z-10" />
        <ThreeScene />
        
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col gap-6">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-200 shadow-2xl">
                <Heart className="w-10 h-10 text-red-500 mb-3" />
                <p className="text-gray-900 text-base font-semibold">Patient Care</p>
                <p className="text-gray-600 text-xs mt-1">Compassionate & Professional</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-200 shadow-2xl">
                <Stethoscope className="w-10 h-10 text-blue-500 mb-3" />
                <p className="text-gray-900 text-base font-semibold">Medical Excellence</p>
                <p className="text-gray-600 text-xs mt-1">Advanced Healthcare Solutions</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
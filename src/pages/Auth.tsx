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
import { GoogleLogin } from "@react-oauth/google";
import * as THREE from "three";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { appendUser, updateLoginMethod } from "@/redux/slices/appSlice";
import { useGoogleSignInMutation, useLoginMutation } from "@/redux/slices/api";

function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

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
    const nodes: THREE.Mesh[] = [];
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
      const points = [nodes[i].position, nodes[nextIndex].position];

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
      "position",
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

    let frameId: number;
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
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
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

  const [login] = useLoginMutation();
  const [googleSignIn] = useGoogleSignInMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await login({ email, password }).unwrap();
      const user = res.user;

      dispatch(appendUser({ user }));
      dispatch(updateLoginMethod("email"));

      if (user.role === "admin") {
        navigate(`/hospitals/${user.hospital}`);
      } else {
        navigate("/dashboard");
      }
    } catch {
      toast({
        title: "Authentication failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      setIsGoogleLoading(true);

      const res = await googleSignIn({ idToken: credential }).unwrap();
      const user = res.user;

      dispatch(appendUser({ user }));
      dispatch(updateLoginMethod("email"));

      if (user.role === "admin") {
        navigate(`/hospitals/${user.hospital}`);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast({
        title: "Google login failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
                <p className="text-sm text-blue-600/70">Hospital Management System</p>
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

          <motion.div variants={itemVariants} className="mb-5 flex justify-center">
            <GoogleLogin
              onSuccess={(cred) => {
                if (cred.credential) handleGoogleLogin(cred.credential);
              }}
              onError={() => console.log("Google Login Failed")}
              text="continue_with"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-blue-50 text-gray-500 rounded-full">OR</span>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="name"
                    className="text-gray-700 mb-2 flex items-center gap-2 text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === "name" ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      className="w-full h-12 px-4 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg outline-none"
                      placeholder="Enter your full name"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="text-gray-700 mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Mail className="w-4 h-4 shrink-0" />
                Email Address
              </label>
              <motion.div
                animate={{ scale: focusedField === "email" ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                  autoComplete="email"
                  className="w-full h-12 px-4 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg outline-none"
                  placeholder="you@example.com"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="text-gray-700 mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Lock className="w-4 h-4 shrink-0" />
                Password
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === "password" ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  required
                  autoComplete="current-password"
                  className="w-full h-12 px-4 pr-12 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {showPassword ? (
                      <motion.span
                        key="eye-off"
                        initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 10, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-center"
                      >
                        <EyeOff className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="eye"
                        initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -10, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  disabled={isLoading || isGoogleLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
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
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-4 text-gray-500 text-xs"
          >
            <button
              type="button"
              className="hover:text-gray-700 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              Privacy
            </button>
            <span aria-hidden>•</span>
            <button
              type="button"
              className="hover:text-gray-700 transition-colors"
            >
              Terms
            </button>
            <span aria-hidden>•</span>
            <button
              type="button"
              className="hover:text-gray-700 transition-colors flex items-center gap-1"
            >
              <Heart className="w-3 h-3" />
              Support
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/50 z-10 pointer-events-none" />
        <ThreeScene />

        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col gap-6">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                delay: 0.5,
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
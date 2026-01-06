import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Stethoscope,
} from "lucide-react";
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
import { useDispatch } from "react-redux";
import { appendUser, updateLoginMethod } from "@/redux/slices/appSlice";
import { doctorsData } from "@/data/doctorData";
import { AdminType, DoctorType } from "@/types/type";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  /* ---------------- LOGIN ---------------- */

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

      // Build full admin object
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
      if (!mapping) throw new Error("Invalid doctor");

      const doctor = doctorsData.find(d => d.id === mapping.doctorId);
      if (!doctor) throw new Error("Doctor profile not found");

      hospitalId = doctor.hospital;

      // Use the full doctor object
      user = {
        ...doctor,
        email, // override email if needed
      };
    }

    // Dispatch the full user object
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



  const handleGoogleLogin = async () => {
    try {
      // future google auth
    } catch {
      toast({
        title: "Error",
        description: "Google sign-in failed",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex overflow-x-hidden">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MediCare Pro</h1>
              <p className="text-xs text-muted-foreground">
                Hospital Management
              </p>
            </div>
          </Link>

          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>

          <Button
            variant="outline"
            className="w-full mb-6 gap-2"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Continue with Google"
            )}
          </Button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Label>Full Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center">
        <Stethoscope className="w-24 h-24 opacity-20" />
      </div>
    </div>
  );
}

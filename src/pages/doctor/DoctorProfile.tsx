import { motion } from 'framer-motion';
import { 
  Mail,
  Phone,
  Calendar,
  Award,
  GraduationCap,
  Clock,
  Building2,
  Edit,
  Camera,
  CheckCircle2,
  Coffee,
  AlertCircle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateDoctorStatus } from "@/redux/slices/appSlice";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAppSelector } from '@/redux/hooks';
import { selectPatientsByDoctor } from '@/selectors/selectors';

type DoctorStatus = "active" | "on-leave" | "busy";

export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const currentUser = useSelector(
    (state: RootState) => state.app.doctorUser
  );

  const patients = useAppSelector(state =>
    currentUser?.id ? selectPatientsByDoctor(state, currentUser.id) : []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const currentStatus = (currentUser?.status || "active") as DoctorStatus;

const convertTo24Hour = (time?: string | null) => {
  if (!time) return "N/A";

  // If ISO string
  const isoMatch = time.match(/^\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):/);
  if (isoMatch) {
    const hh = isoMatch[1];
    const mm = isoMatch[2];
    return `${hh}:${mm}`;
  }

  // Otherwise assume 12-hour format like "9:00 AM"
  const parts = time.trim().split(" ");
  if (parts.length !== 2) return time;

  const [t, period] = parts;
  const [hours, minutes] = t.split(":");
  if (!hours || !minutes) return time;

  let hh = parseInt(hours, 10);
  const mm = minutes.padStart(2, "0");

  if (period.toUpperCase() === "PM" && hh < 12) hh += 12;
  if (period.toUpperCase() === "AM" && hh === 12) hh = 0;

  return `${hh.toString().padStart(2, "0")}:${mm}`;
};

  const handleStatusChange = (newStatus: DoctorStatus) => {
    dispatch(updateDoctorStatus(newStatus));
    toast({
      title: "Status Updated",
      description: `Your status has been changed to ${newStatus.replace('-', ' ')}`,
      duration: 3000,
    });
  };

  const getStatusConfig = (status: DoctorStatus) => {
    switch (status) {
      case "active":
        return {
          icon: CheckCircle2,
          label: "Active",
          color: "bg-emerald-500 hover:bg-emerald-600 text-white",
          badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
        };
      case "on-leave":
        return {
          icon: Coffee,
          label: "On Leave",
          color: "bg-amber-500 hover:bg-amber-600 text-white",
          badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
        };
      case "busy":
        return {
          icon: AlertCircle,
          label: "Busy",
          color: "bg-red-500 hover:bg-red-600 text-white",
          badgeColor: "bg-red-500/10 text-red-700 border-red-500/20",
        };
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Loading profile...</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Profile Header Card */}
            <motion.div variants={itemVariants}>
              <Card className="mb-8 overflow-hidden shadow-lg">
                <div className="h-40 bg-gradient-to-r from-primary via-primary/90 to-secondary relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/10" />
                </div>
                <CardContent className="relative pt-0 pb-8 px-8">
                  <div className="flex flex-col lg:flex-row lg:items-end gap-6 -mt-20">
                    <div className="relative">
                      <motion.div 
                        className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-5xl font-bold border-8 border-background shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {currentUser.username?.charAt(0).toUpperCase() || "D"}
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="absolute bottom-2 right-2 rounded-full h-12 w-12 shadow-lg"
                        >
                          <Camera className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    </div>
                    
                    <div className="flex-1 lg:pb-4">
                      <div className="flex flex-col gap-6">
                        <div>
                          <h1 className="text-3xl font-bold text-foreground mb-2">
                            Dr. {currentUser.username || "Unknown"}
                          </h1>
                          <p className="flex items-center gap-2 text-lg font-medium text-black-600 dark:text-indigo-400 mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-indigo-900 dark:text-indigo-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
                              />
                            </svg>
                            {currentUser.speciality || "General Practitioner"}
                          </p>

                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="default" className="text-sm px-3 py-1">
                              Doctor
                            </Badge>
                            <Badge variant="outline" className="text-sm px-3 py-1">
                              {currentUser.hospital || "N/A"}
                            </Badge>
                            <Badge 
                              className={cn("text-sm px-3 py-1 border", getStatusConfig(currentStatus).badgeColor)}
                            >
                              {getStatusConfig(currentStatus).label}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="gap-2 h-11 px-6">
                              <Edit className="w-4 h-4" />
                              Edit Profile
                            </Button>
                          </motion.div>
                          
                          <div className="flex flex-wrap gap-2">
                            {(["active", "on-leave", "busy"] as DoctorStatus[]).map((status) => {
                              const config = getStatusConfig(status);
                              const Icon = config.icon;
                              const isActive = currentStatus === status;
                              
                              return (
                                <motion.div
                                  key={status}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    variant={isActive ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                      "gap-2 h-9 px-4 transition-all",
                                      isActive && config.color
                                    )}
                                    onClick={() => handleStatusChange(status)}
                                  >
                                    <Icon className="w-4 h-4" />
                                    {config.label}
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                        <p className="font-medium text-foreground truncate">{currentUser.email || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                        <p className="font-medium text-foreground">{currentUser.phone || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Hospital</p>
                        <p className="font-medium text-foreground">{currentUser.hospital || "N/A"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Professional Information */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Award className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Experience</p>
                        <p className="font-medium text-foreground">{currentUser.experience || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Calendar className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                        <p className="font-medium text-foreground capitalize">
                          {currentStatus.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Clock className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Consultation Fee</p>
                        <p className="font-medium text-foreground">
                          {currentUser.consultationFee ? `$${currentUser.consultationFee}` : "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Education & Degrees */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Education & Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        Education
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentUser.education || "No education information available"}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Medical License</h4>
                      <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                        <Award className="w-4 h-4" />
                        {currentUser.licenseNumber || "N/A"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Availability */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Availability Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        Available Days
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.availableDays && currentUser.availableDays.length > 0 ? (
                          currentUser.availableDays.map((day) => (
                            <Badge 
                              key={day} 
                              variant="secondary" 
                              className="px-3 py-1.5 text-sm"
                            >
                              {day}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No days specified</p>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-2">Next Available Slot</p>
                      <p className="text-2xl font-semibold text-primary">
                        {convertTo24Hour(currentUser.nextAvailable)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Statistics Card */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div 
                      className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-4xl font-bold text-primary mb-2">
                        {patients.length}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </motion.div>
                    
                    <motion.div 
                      className="text-center p-4 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-4xl font-bold text-emerald-600 mb-2">
                        {currentUser.experience || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">Experience</p>
                    </motion.div>
                    
                    <motion.div 
                      className="text-center p-4 rounded-lg bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-4xl font-bold text-amber-600 mb-2">
                        {currentUser.rating ? `${currentUser.rating} ⭐` : "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
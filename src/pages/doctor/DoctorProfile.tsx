import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  GraduationCap,
  Clock,
  Building2,
  Edit,
  Camera
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useDoctors } from '@/contexts/DoctorsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";

export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );
  const { doctors } = useDoctors();

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

  const doctorData = doctors.find((doc) => doc.id === user?.id) || doctors[0];

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
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Card className="mb-6 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary to-secondary" />
                <CardContent className="relative pt-0 pb-6 px-6">
                  <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-4xl font-bold border-4 border-background">
                        {user?.username.charAt(0)}
                      </div>
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex-1 md:pb-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h1 className="text-2xl font-bold text-foreground">{user?.username}</h1>
                          <p className="text-muted-foreground">{doctorData?.specialty}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="default">Doctor</Badge>
                            <Badge variant="outline">{user?.hospital}</Badge>
                          </div>
                        </div>
                        <Button className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{doctorData?.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hospital</p>
                        <p className="font-medium">{user?.hospital}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <Award className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="font-medium">{doctorData?.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <Calendar className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{doctorData?.status?.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <Clock className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Consultation Fee</p>
                        <p className="font-medium">${doctorData?.consultationFee}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Education & Degrees
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Education</h4>
                      <p className="text-sm text-muted-foreground">{doctorData?.education}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">License</h4>
                      <Badge variant="secondary" className="gap-2">
                        <Award className="w-3 h-3" />
                        {doctorData?.licenseNumber}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Available Days</p>
                        <div className="flex flex-wrap gap-2">
                          {doctorData?.availableDays?.map((day) => (
                            <Badge key={day} variant="secondary">{day}</Badge>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Timings</p>
                        <p className="font-medium">{doctorData?.nextAvailable}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{doctorData?.patients}</p>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-secondary">{doctorData?.nextAvailable}</p>
                      <p className="text-sm text-muted-foreground">Next Slot</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-accent">{doctorData?.experience}</p>
                      <p className="text-sm text-muted-foreground">Experience</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-success">{doctorData?.rating}</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
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

import { motion } from 'framer-motion';
import { 
  Clock, 
  User,
  CheckCircle2,
  XCircle,
  Calendar
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";

export const pendingAppointments = [
  // City General Hospital (doctorId: 1-5)
  { id: 1, doctorId: 1, hospital: "city-general", patient: 'Alice Thompson', requestedTime: '09:00 AM', requestedDate: '2024-01-16', type: 'Consultation', reason: 'Persistent headaches for 2 weeks', requestedAt: '2024-01-14' },
  { id: 2, doctorId: 1, hospital: "city-general", patient: 'Brian Scott', requestedTime: '10:30 AM', requestedDate: '2024-01-16', type: 'Follow-up', reason: 'Blood pressure review', requestedAt: '2024-01-15' },
  { id: 3, doctorId: 2, hospital: "city-general", patient: 'Catherine Hill', requestedTime: '11:00 AM', requestedDate: '2024-01-16', type: 'Check-up', reason: 'Annual health check', requestedAt: '2024-01-14' },
  { id: 4, doctorId: 2, hospital: "city-general", patient: 'Daniel Wright', requestedTime: '02:00 PM', requestedDate: '2024-01-16', type: 'Consultation', reason: 'Digestive issues', requestedAt: '2024-01-15' },
  { id: 5, doctorId: 3, hospital: "city-general", patient: 'Eva Morgan', requestedTime: '03:30 PM', requestedDate: '2024-01-16', type: 'Video Call', reason: 'Telemedicine follow-up', requestedAt: '2024-01-14' },

  // Metro Health Center (doctorId: 6-10)
  { id: 6, doctorId: 6, hospital: "metro-health", patient: 'David Clark', requestedTime: '09:15 AM', requestedDate: '2024-01-17', type: 'Follow-up', reason: 'Post-medication review', requestedAt: '2024-01-14' },
  { id: 7, doctorId: 6, hospital: "metro-health", patient: 'Fiona Adams', requestedTime: '10:45 AM', requestedDate: '2024-01-17', type: 'Consultation', reason: 'Chest pain evaluation', requestedAt: '2024-01-15' },
  { id: 8, doctorId: 7, hospital: "metro-health", patient: 'George Baker', requestedTime: '11:30 AM', requestedDate: '2024-01-17', type: 'Check-up', reason: 'Routine lab review', requestedAt: '2024-01-14' },
  { id: 9, doctorId: 7, hospital: "metro-health", patient: 'Hannah Collins', requestedTime: '01:00 PM', requestedDate: '2024-01-17', type: 'Video Call', reason: 'Remote consultation for diabetes', requestedAt: '2024-01-15' },
  { id: 10, doctorId: 8, hospital: "metro-health", patient: 'Ian Turner', requestedTime: '02:30 PM', requestedDate: '2024-01-17', type: 'Consultation', reason: 'High cholesterol evaluation', requestedAt: '2024-01-14' },

  // Sunrise Medical Complex (doctorId: 11-15)
  { id: 11, doctorId: 11, hospital: "sunrise-medical", patient: 'Jennifer Lee', requestedTime: '09:00 AM', requestedDate: '2024-01-18', type: 'Check-up', reason: 'Annual health screening', requestedAt: '2024-01-13' },
  { id: 12, doctorId: 11, hospital: "sunrise-medical", patient: 'Kevin Price', requestedTime: '10:30 AM', requestedDate: '2024-01-18', type: 'Consultation', reason: 'Migraine evaluation', requestedAt: '2024-01-14' },
  { id: 13, doctorId: 12, hospital: "sunrise-medical", patient: 'Laura Bell', requestedTime: '11:15 AM', requestedDate: '2024-01-18', type: 'Video Call', reason: 'Telemedicine for skin rash', requestedAt: '2024-01-14' },
  { id: 14, doctorId: 12, hospital: "sunrise-medical", patient: 'Michael Foster', requestedTime: '01:00 PM', requestedDate: '2024-01-18', type: 'Follow-up', reason: 'Back pain review', requestedAt: '2024-01-15' },
  { id: 15, doctorId: 13, hospital: "sunrise-medical", patient: 'Natalie Cox', requestedTime: '02:30 PM', requestedDate: '2024-01-18', type: 'Consultation', reason: 'Thyroid check', requestedAt: '2024-01-14' },

  // Valley Regional Hospital (doctorId: 16-20)
  { id: 16, doctorId: 16, hospital: "valley-regional", patient: 'William Anderson', requestedTime: '09:30 AM', requestedDate: '2024-01-19', type: 'Video Call', reason: 'Remote consultation for skin condition', requestedAt: '2024-01-12' },
  { id: 17, doctorId: 16, hospital: "valley-regional", patient: 'Olivia Scott', requestedTime: '10:45 AM', requestedDate: '2024-01-19', type: 'Consultation', reason: 'Routine check-up', requestedAt: '2024-01-14' },
  { id: 18, doctorId: 17, hospital: "valley-regional", patient: 'Peter Evans', requestedTime: '11:30 AM', requestedDate: '2024-01-19', type: 'Follow-up', reason: 'Post-surgery review', requestedAt: '2024-01-14' },
  { id: 19, doctorId: 17, hospital: "valley-regional", patient: 'Quinn Harris', requestedTime: '01:00 PM', requestedDate: '2024-01-19', type: 'Consultation', reason: 'Blood pressure check', requestedAt: '2024-01-15' },
  { id: 20, doctorId: 18, hospital: "valley-regional", patient: 'Rachel Green', requestedTime: '02:30 PM', requestedDate: '2024-01-19', type: 'Check-up', reason: 'Cholesterol evaluation', requestedAt: '2024-01-14' }
];

  export const filterPendingByDoctor = (
    pendingAppointments,
    doctorId
  ) => {
    return pendingAppointments.filter(
      appt => appt.doctorId === doctorId
    );
  };



export default function DoctorPendingAppointments() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );
  const { toast } = useToast();

  const currentPendingAppointments = filterPendingByDoctor(
    pendingAppointments,
    user.id
  );

  const handleApprove = (id: number, patient: string) => {
    toast({
      title: "Appointment Approved",
      description: `Appointment with ${patient} has been confirmed.`,
    });
  };

  const handleReject = (id: number, patient: string) => {
    toast({
      title: "Appointment Declined",
      description: `Appointment request from ${patient} has been declined.`,
      variant: "destructive",
    });
  };

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
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Pending Appointments
              </h1>
              <p className="text-muted-foreground">
                Review and approve appointment requests
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-warning/10">
                      <Clock className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{currentPendingAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Pending Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="space-y-4">
                {currentPendingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-warning">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warning to-orange-400 flex items-center justify-center text-white font-semibold">
                              {appointment.patient.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{appointment.reason}</p>
                              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {appointment.requestedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {appointment.requestedTime}
                                </span>
                                <Badge variant="outline">{appointment.type}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                Requested on {appointment.requestedAt}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1 text-destructive hover:text-destructive"
                              onClick={() => handleReject(appointment.id, appointment.patient)}
                            >
                              <XCircle className="w-4 h-4" />
                              Decline
                            </Button>
                            <Button 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleApprove(appointment.id, appointment.patient)}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {pendingAppointments.length === 0 && (
              <motion.div 
                variants={itemVariants}
                className="text-center py-12"
              >
                <CheckCircle2 className="w-12 h-12 mx-auto text-success mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  No pending appointment requests at the moment.
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock,
  User,
  CheckCircle2,
  Video
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { doctorAppointments as appointments } from '@/data/doctorSamples';
import {appointmentsData } from '@/data/appointmentsData';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";

export default function DoctorAppointments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.app
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

  const todayAppointments = appointments.filter(
  appt => /*appt.date === today && */ appt.doctorId === user.id
);

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
                My Appointments
              </h1>
              <p className="text-muted-foreground">
                View and manage your scheduled appointments
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{todayAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Today's Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-success/10">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {todayAppointments.filter(a => a.status === 'Confirmed').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Confirmed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-secondary/10">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {todayAppointments.filter(a => a.status === 'Upcoming').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Upcoming</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold text-foreground mb-4">Today's Schedule</h2>
              <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                              {appointment.patient.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {appointment.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  {appointment.type === 'Video Call' ? (
                                    <Video className="w-4 h-4" />
                                  ) : (
                                    <User className="w-4 h-4" />
                                  )}
                                  {appointment.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={appointment.status === 'Confirmed' ? 'default' : 'secondary'}>
                              {appointment.status}
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => navigate(`/doctor/appointments/${appointment.id}`)}>
                              View Details
                            </Button>
                            {appointment.type === 'Video Call' && (
                              <Button size="sm" className="gap-1">
                                <Video className="w-4 h-4" />
                                Join
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Card, CardContent } from '@/components/ui/card';
//import { getAppointmentsByDoctorId } from '@/data/appointmentsData';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppointmentCalendar } from '@/components/AppointmentCalendar';
import { selectAppointmentsByDoctor } from '@/selectors/selectors';


export default function DoctorAppointments() {
  const { user } = useSelector((state: RootState) => state.app);

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

  // Get appointments for the logged-in doctor
  const appointments = useSelector(
  user?.id ? selectAppointmentsByDoctor(user.id) : () => []
);


  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === today);
  }, [appointments]);

  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

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
            {/* Page Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                My Appointments
              </h1>
              <p className="text-muted-foreground">
                View and manage your scheduled appointments using the calendar below
              </p>
            </motion.div>

            {/* Stats Summary */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{appointments.length}</p>
                      <p className="text-sm text-muted-foreground">Total Appointments</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{todayAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Today</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{confirmedCount}</p>
                      <p className="text-sm text-muted-foreground">Confirmed</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-xl bg-amber-500/10">
                      <AlertCircle className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Calendar */}
            <motion.div variants={itemVariants}>
              <AppointmentCalendar appointments={appointments} />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

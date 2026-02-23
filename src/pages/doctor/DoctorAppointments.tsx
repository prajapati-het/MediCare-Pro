import { motion } from 'framer-motion';
import { skipToken } from "@reduxjs/toolkit/query/react";
import { 
  Calendar, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppointmentCalendar } from '@/components/AppointmentCalendar';
import { selectMonthlyAppointmentsByDoctor, selectTodayAppointmentsByDoctor } from '@/selectors/selectors';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useGetMonthlyAppointmentsQuery, useGetTodayAppointmentsQuery } from '@/redux/slices/api';
import { useEffect } from 'react';

export default function DoctorAppointments() {
  const user  = useSelector((state: RootState) => state.app.doctorUser);
  const doctorCode = useSelector((state: RootState) => state.app.doctorCode);
  const navigate = useNavigate();

  

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

  const doctorId = user?.id;

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  const month = date.getMonth() + 1;   
  const year = date.getFullYear();

  console.log(doctorCode, today, month, year);

  // Today appointments
  const { data: todayAppointments = [], isLoading: todayLoading, error: todayError } = useGetTodayAppointmentsQuery(
    doctorCode ? { doctorCode, date: today } : skipToken
  );

  // Monthly appointments
  const { data: monthlyAppointments = [], isLoading: monthLoading, error: monthError } = useGetMonthlyAppointmentsQuery(
    doctorCode ? { doctorCode, month, year } : skipToken
  );

  console.log("Today:", todayAppointments);        // always an array
  console.log("Monthly:", monthlyAppointments);    // always an array

  const pendingCount = monthlyAppointments.filter(a => a.status === "Pending").length;
  const confirmedCount = monthlyAppointments.filter(a => a.status === "Confirmed").length;

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
                View and manage your scheduled appointments using the calendar below
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8"
            >
              <Card 
                className="overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => navigate("/doctor/appointments/today")}
              >
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
                      <p className="text-2xl font-bold text-foreground">{todayAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Today's Appointments</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              <Card 
                className="overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => navigate("/doctor/appointments/confirmed")}
              >
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

              <Card
                className="overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => navigate("/doctor/appointments/pending")}
              >
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
                      <p className="text-2xl font-bold text-foreground">
                        {pendingCount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pending
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              <Card 
                className="overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => navigate("/doctor/appointments/monthly")}
              >
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
                      <p className="text-2xl font-bold text-foreground">{monthlyAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Monthly Appointments</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <AppointmentCalendar/>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  Building2, 
  TrendingUp,
  TrendingDown,
  Activity,
  Bed,
  Clock,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  ArrowUpRight
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useMemo } from 'react';
import { selectPatientsByDoctor, selectTodayAppointmentsByDoctor } from '@/selectors/selectors';
import { useAppSelector } from '@/redux/hooks';
import { useGetDoctorPatientsQuery, useGetUserDetailsQuery } from '@/redux/slices/api';
import { PageLoader } from '@/components/PageLoader';
import { setDoctorCode } from '@/redux/slices/appSlice';
import { setDoctorInfo, setDoctorPatients } from '@/redux/slices/doctorSlice';

const weeklyData = [
  { name: 'Mon', patients: 120, appointments: 85, admissions: 24 },
  { name: 'Tue', patients: 145, appointments: 92, admissions: 32 },
  { name: 'Wed', patients: 180, appointments: 110, admissions: 45 },
  { name: 'Thu', patients: 165, appointments: 98, admissions: 38 },
  { name: 'Fri', patients: 190, appointments: 125, admissions: 52 },
  { name: 'Sat', patients: 95, appointments: 62, admissions: 18 },
  { name: 'Sun', patients: 78, appointments: 45, admissions: 12 },
];

const departmentData = [
  { name: 'Cardiology', value: 28, color: 'hsl(205, 85%, 45%)' },
  { name: 'Neurology', value: 22, color: 'hsl(170, 45%, 45%)' },
  { name: 'Orthopedics', value: 18, color: 'hsl(150, 50%, 45%)' },
  { name: 'Pediatrics', value: 15, color: 'hsl(38, 92%, 50%)' },
  { name: 'Other', value: 17, color: 'hsl(215, 15%, 45%)' },
];

const recentActivities = [
  { type: 'admission', icon: UserPlus, message: 'New patient admitted to ICU', time: '5 min ago', status: 'info' },
  { type: 'appointment', icon: Calendar, message: 'Dr. Smith completed 3 appointments', time: '15 min ago', status: 'success' },
  { type: 'alert', icon: AlertCircle, message: 'Low inventory: Surgical supplies', time: '32 min ago', status: 'warning' },
  { type: 'discharge', icon: CheckCircle2, message: 'Patient John D. discharged', time: '1 hour ago', status: 'success' },
  { type: 'appointment', icon: Clock, message: 'Upcoming surgery scheduled', time: '2 hours ago', status: 'info' },
];

const upcomingAppointments = [
  { patient: 'Sarah Johnson', doctor: 'Dr. Michael Chen', time: '09:00 AM', type: 'Cardiology' },
  { patient: 'Robert Williams', doctor: 'Dr. Emily Davis', time: '10:30 AM', type: 'Orthopedics' },
  { patient: 'Maria Garcia', doctor: 'Dr. James Wilson', time: '11:00 AM', type: 'Neurology' },
  { patient: 'David Brown', doctor: 'Dr. Lisa Anderson', time: '02:00 PM', type: 'Pediatrics' },
];

export default function Dashboard() {
  const { doctorUser, adminUser, isLoggedIn } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  if(doctorUser)
    dispatch(setDoctorInfo(doctorUser))

  const doctorId = doctorUser?.id;
  const todayStr = new Date().toISOString().split("T")[0];

  const todayAppointments = useAppSelector(state =>
    doctorId ? selectTodayAppointmentsByDoctor(state, doctorId, todayStr) : []
  );

  const { data: apiData, isLoading } = useGetDoctorPatientsQuery(String(doctorId ?? null), {
    skip: doctorId == null
  });

  // const fallbackPatients = useAppSelector(state =>
  //   doctorId != null ? selectPatientsByDoctor(state, Number(doctorId)) : []
  // );

  useEffect(() => {
    if (apiData?.patients) {
      console.log(apiData?.patients.length)
      // Remove old data first
      localStorage.removeItem("patients");
      localStorage.removeItem("TotalPatients");

      dispatch(setDoctorPatients(apiData?.patients))

      // Store fresh data
      localStorage.setItem("patients", JSON.stringify(apiData.patients));
      localStorage.setItem("TotalPatients", JSON.stringify(apiData.totalPatients));

      console.log("[localStorage] Updated patients:", apiData.patients);
    }
  }, [apiData, dispatch]);

  const patients = apiData?.patients ;
  const totalPatients = apiData?.totalPatients ;
  

  useEffect(() => {
    if (apiData?.doctorCode != null) {
      dispatch(setDoctorCode(apiData.doctorCode));
    }
  }, [apiData?.doctorCode, dispatch]);

  // Stats cards
  const statsCards = useMemo(() => [
    { 
      icon: Users, 
      label: 'Total Patients', 
      value: totalPatients, 
      change: '+12.5%',   // static for now
      trend: 'up',
      color: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    { 
      icon: Stethoscope, 
      label: 'Active Doctors', 
      value: '248',       // static
      change: '+5.2%', 
      trend: 'up',
      color: 'bg-secondary/10',
      iconColor: 'text-secondary'
    },
    { 
      icon: Calendar, 
      label: "Today's Appointments", 
      value: todayAppointments.length.toString(),
      change: '-3.1%',    // static
      trend: 'down',
      color: 'bg-accent/10',
      iconColor: 'text-accent'
    },
    { 
      icon: Bed, 
      label: 'Available Beds', 
      value: '89',        // static
      change: '+8.4%', 
      trend: 'up',
      color: 'bg-success/10',
      iconColor: 'text-success'
    },
  ], [todayAppointments.length, totalPatients]);

  // ✅ Motion variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (isLoading) return <PageLoader />;


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {isLoggedIn  && <DashboardSidebar />}
        
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {doctorUser ? `Welcome back, ${doctorUser.username.split(' ')[0]}!` : 'Dashboard Overview'}
              </h1>
              <p className="text-muted-foreground">
                {adminUser
                  ? `Managing ${adminUser.hospital || 'your hospital'}`
                  : doctorUser
                  ? `Welcome to ${doctorUser.hospital || 'your hospital'}`
                  : 'View hospital statistics and performance metrics'
                }
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {statsCards.map((stat, index) => (
                <Card key={stat.label} className="hover-lift overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-medium ${
                        stat.trend === 'up' ? 'text-success' : 'text-destructive'
                      }`}>
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Weekly Overview</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-primary" />
                        Patients
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-secondary" />
                        Appointments
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(205, 85%, 45%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(205, 85%, 45%)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(170, 45%, 45%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(170, 45%, 45%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                      <XAxis dataKey="name" stroke="hsl(215, 15%, 45%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 15%, 45%)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'hsl(0, 0%, 100%)', 
                          border: '1px solid hsl(210, 20%, 90%)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="patients" 
                        stroke="hsl(205, 85%, 45%)" 
                        fillOpacity={1} 
                        fill="url(#colorPatients)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="appointments" 
                        stroke="hsl(170, 45%, 45%)" 
                        fillOpacity={1} 
                        fill="url(#colorAppointments)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Share']}
                        contentStyle={{ 
                          background: 'hsl(0, 0%, 100%)', 
                          border: '1px solid hsl(210, 20%, 90%)',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {departmentData.map((dept) => (
                      <span key={dept.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ background: dept.color }} />
                        {dept.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <Activity className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`p-2 rounded-lg ${
                          activity.status === 'success' ? 'bg-success/10' :
                          activity.status === 'warning' ? 'bg-warning/10' :
                          'bg-primary/10'
                        }`}>
                          <activity.icon className={`w-4 h-4 ${
                            activity.status === 'success' ? 'text-success' :
                            activity.status === 'warning' ? 'text-warning' :
                            'text-primary'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      View All
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((apt, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div>
                          <p className="font-medium text-foreground">{apt.patient}</p>
                          <p className="text-sm text-muted-foreground">{apt.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{apt.time}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {apt.type}
                          </span>
                        </div>
                      </motion.div>
                    ))}
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

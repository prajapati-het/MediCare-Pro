import { motion } from 'framer-motion';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useMemo } from 'react';
import {
  useGetDoctorPatientsQuery,
  useGetTodayAppointmentsQuery,
  useGetDoctorStatsQuery,
} from '@/redux/slices/api';
import { PageLoader } from '@/components/PageLoader';
import { setDoctorCode } from '@/redux/slices/appSlice';
import { setDoctorInfo } from '@/redux/slices/doctorSlice';
import { skipToken } from '@reduxjs/toolkit/query';

// ─── Status colour map ────────────────────────────────────────────────────────
// Keys must match the status strings stored in your DB (case-insensitive lookup below)
const STATUS_COLORS: Record<string, string> = {
  admitted:   'hsl(205, 85%, 45%)',
  discharged: 'hsl(150, 50%, 42%)',
  critical:   'hsl(0,   75%, 52%)',
  stable:     'hsl(170, 45%, 45%)',
  pending:    'hsl(38,  92%, 50%)',
  recovered:  'hsl(120, 45%, 45%)',
};
const FALLBACK_COLOR = 'hsl(215, 15%, 55%)';

const recentActivities = [
  { icon: UserPlus,     message: 'New patient admitted to ICU',          time: '5 min ago',   status: 'info'    },
  { icon: Calendar,     message: 'Dr. Smith completed 3 appointments',   time: '15 min ago',  status: 'success' },
  { icon: AlertCircle,  message: 'Low inventory: Surgical supplies',     time: '32 min ago',  status: 'warning' },
  { icon: CheckCircle2, message: 'Patient John D. discharged',           time: '1 hour ago',  status: 'success' },
  { icon: Clock,        message: 'Upcoming surgery scheduled',           time: '2 hours ago', status: 'info'    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { doctorUser, adminUser, isLoggedIn } = useSelector((state: RootState) => state.app);
  const doctorCode = useSelector((state: RootState) => state.app.doctorCode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctorUser) dispatch(setDoctorInfo(doctorUser));
  }, [doctorUser, dispatch]);

  const doctorId = doctorUser?.id;

  // ── Patients query (also sets doctorCode in redux) ────────────────────────
  const { data: apiData, isLoading: patientsLoading } = useGetDoctorPatientsQuery(
    String(doctorId),
    { skip: !doctorId }
  );

  useEffect(() => {
    if (apiData?.doctorCode != null) dispatch(setDoctorCode(apiData.doctorCode));
  }, [apiData?.doctorCode, dispatch]);

  // ── Stats query ───────────────────────────────────────────────────────────
  const { data: statsData, isLoading: statsLoading } = useGetDoctorStatsQuery(
    doctorId ? String(doctorId) : skipToken
  );

  // ── Today's appointments (fallback) ───────────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  const { data: todayAppointments = [] } = useGetTodayAppointmentsQuery(
    doctorCode ? { doctorCode, date: today } : skipToken
  );

  // ── Derived data ──────────────────────────────────────────────────────────
  const weeklyData = useMemo(() => statsData?.weeklyStats ?? [], [statsData]);

  const liveTotalPatients     = statsData?.totalPatients     ?? apiData?.totalPatients ?? 0;
  const liveTodayAppointments = statsData?.todayAppointments ?? todayAppointments.length;

  // Patient status breakdown — comes from statsData.statusStats
  const statusData = useMemo(() => {
    const raw: { name: string; value: number }[] = statsData?.statusStats ?? [];
    return raw.map((s) => ({
      ...s,
      color: STATUS_COLORS[s.name?.toLowerCase()] ?? FALLBACK_COLOR,
      pct: liveTotalPatients > 0 ? Math.round((s.value / liveTotalPatients) * 100) : 0,
    }));
  }, [statsData, liveTotalPatients]);

  // ── Stats cards ────────────────────────────────────────────────────────────
  const statsCards = useMemo(() => [
    { icon: Users,       label: 'Total Patients',      value: liveTotalPatients.toString(),     change: '+12.5%', trend: 'up',   color: 'primary'   },
    { icon: Stethoscope, label: 'Active Doctors',       value: '248',                            change: '+5.2%',  trend: 'up',   color: 'secondary' },
    { icon: Calendar,    label: "Today's Appointments", value: liveTodayAppointments.toString(), change: '-3.1%',  trend: 'down', color: 'accent'    },
    { icon: Bed,         label: 'Available Beds',       value: '89',                             change: '+8.4%',  trend: 'up',   color: 'success'   },
  ], [liveTodayAppointments, liveTotalPatients]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants       = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (patientsLoading || statsLoading) return <PageLoader />;

  const upcomingAppointments: { patient: string; doctor: string; time: string; type: string }[] =
    statsData?.upcomingAppointments ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        {isLoggedIn && <DashboardSidebar />}

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* ── Greeting ─────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {doctorUser ? `Welcome back, ${doctorUser.username.split(' ')[0]}!` : 'Dashboard Overview'}
              </h1>
              <p className="text-muted-foreground">
                {adminUser
                  ? `Managing ${adminUser.hospital || 'your hospital'}`
                  : doctorUser
                  ? `Welcome to ${doctorUser.hospital || 'your hospital'}`
                  : 'View hospital statistics and performance metrics'}
              </p>
            </motion.div>

            {/* ── Stats cards ───────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statsCards.map((stat) => (
                <Card key={stat.label} className="hover-lift overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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

            {/* ── Weekly chart + Patient Status ─────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

              {/* Weekly overview area chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Weekly Overview</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-primary" /> Patients
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-secondary" /> Appointments
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {weeklyData.length === 0 ? (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                      No weekly data available
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="hsl(205, 85%, 45%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(205, 85%, 45%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="hsl(170, 45%, 45%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(170, 45%, 45%)" stopOpacity={0} />
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
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                          }}
                        />
                        <Area type="monotone" dataKey="patients"     stroke="hsl(205, 85%, 45%)" fillOpacity={1} fill="url(#colorPatients)"     strokeWidth={2} />
                        <Area type="monotone" dataKey="appointments" stroke="hsl(170, 45%, 45%)" fillOpacity={1} fill="url(#colorAppointments)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* ── Patient Status Breakdown ──────────────────────────────── */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Patient Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {statusData.length === 0 ? (
                    <div className="flex items-center justify-center h-[260px] text-muted-foreground text-sm">
                      No status data available
                    </div>
                  ) : (
                    <div className="space-y-4 mt-1">
                      {statusData.map((s) => (
                        <div key={s.name}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium capitalize text-foreground">{s.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{s.pct}%</span>
                              <span className="text-sm font-bold text-foreground">{s.value}</span>
                            </div>
                          </div>
                          {/* Animated progress bar */}
                          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: s.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${s.pct}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      ))}

                      {/* Legend pills */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                        {statusData.map((s) => (
                          <span key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                            <span className="capitalize">{s.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

            </motion.div>

            {/* ── Activity + Upcoming Appointments ─────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Recent activity */}
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
                          activity.status === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                        }`}>
                          <activity.icon className={`w-4 h-4 ${
                            activity.status === 'success' ? 'text-success' :
                            activity.status === 'warning' ? 'text-warning' : 'text-primary'
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

              {/* Upcoming appointments */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length === 0 ? (
                    <div className="flex items-center justify-center h-[160px] text-muted-foreground text-sm">
                      No upcoming appointments
                    </div>
                  ) : (
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
                  )}
                </CardContent>
              </Card>

            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
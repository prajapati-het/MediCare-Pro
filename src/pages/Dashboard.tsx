import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
  Users, Stethoscope, Calendar, TrendingUp, TrendingDown,
  Activity, Bed, Clock, AlertCircle, CheckCircle2,
  UserPlus, Building2, UserCheck, HeartPulse, BarChart3,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart, Area,
  ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  useGetDoctorPatientsQuery,
  useGetTodayAppointmentsQuery,
  useGetDoctorStatsQuery,
  useGetAdminStatsQuery,
  useGetAdminDetailsQuery,
  useGetHospitalByIdQuery,
} from '@/redux/slices/api';
import { PageLoader } from '@/components/PageLoader';
import { setDoctorCode } from '@/redux/slices/appSlice';
import { setDoctorInfo } from '@/redux/slices/doctorSlice';
import { skipToken } from '@reduxjs/toolkit/query';

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  admitted:    'hsl(205, 85%, 45%)',
  discharged:  'hsl(150, 50%, 42%)',
  critical:    'hsl(0,   75%, 52%)',
  stable:      'hsl(170, 45%, 45%)',
  pending:     'hsl(38,  92%, 50%)',
  recovered:   'hsl(120, 45%, 45%)',
  active:      'hsl(205, 85%, 45%)',
  'follow-up': 'hsl(38,  92%, 50%)',
  new:         'hsl(260, 60%, 55%)',
  chronic:     'hsl(0,   50%, 55%)',
};
const FALLBACK_COLOR = 'hsl(215, 15%, 55%)';

const CHART_COLORS = {
  patients:     'hsl(205, 85%, 45%)',
  appointments: 'hsl(170, 45%, 45%)',
  staffOnDuty:  'hsl(150, 50%, 42%)',
  occupiedBeds: 'hsl(0,   75%, 52%)',
  line:         'hsl(0,   75%, 52%)',
};

const TOOLTIP_STYLE = {
  background: 'hsl(0, 0%, 100%)',
  border: '1px solid hsl(210, 20%, 90%)',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  fontSize: '12px',
};

const recentActivitiesDoctor = [
  { icon: UserPlus,     message: 'New patient admitted to ICU',        time: '5 min ago',   status: 'info'    },
  { icon: Calendar,     message: 'Dr. Smith completed 3 appointments', time: '15 min ago',  status: 'success' },
  { icon: AlertCircle,  message: 'Low inventory: Surgical supplies',   time: '32 min ago',  status: 'warning' },
  { icon: CheckCircle2, message: 'Patient John D. discharged',         time: '1 hour ago',  status: 'success' },
  { icon: Clock,        message: 'Upcoming surgery scheduled',         time: '2 hours ago', status: 'info'    },
];

const recentActivitiesAdmin = [
  { icon: UserPlus,     message: 'Patient admitted to ICU — Cardiology',    time: '5 min ago',   status: 'info'    },
  { icon: Calendar,     message: 'Surgery scheduled — Orthopedics',         time: '15 min ago',  status: 'success' },
  { icon: Stethoscope,  message: 'New doctor joined — Neurology',           time: '32 min ago',  status: 'warning' },
  { icon: CheckCircle2, message: 'Patient discharged — General Ward',       time: '1 hour ago',  status: 'success' },
  { icon: AlertCircle,  message: 'Critical case updated — ICU',             time: '2 hours ago', status: 'info'    },
];

type ChartView = 'overview' | 'appointments' | 'trends';

// ─── Admin Weekly Chart ───────────────────────────────────────────────────────
function AdminWeeklyChart({
  data,
  view,
}: {
  data: { name: string; patients: number; appointments: number; staffOnDuty?: number; occupiedBeds?: number }[];
  view: ChartView;
}) {
  if (view === 'overview') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gPatients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={CHART_COLORS.patients}     stopOpacity={0.35} />
              <stop offset="95%" stopColor={CHART_COLORS.patients}     stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="gAppointments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={CHART_COLORS.appointments} stopOpacity={0.35} />
              <stop offset="95%" stopColor={CHART_COLORS.appointments} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis dataKey="name" stroke="hsl(215,15%,45%)" fontSize={12} />
          <YAxis stroke="hsl(215,15%,45%)" fontSize={12} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Area type="monotone" dataKey="patients"     name="New Patients"  stroke={CHART_COLORS.patients}     fill="url(#gPatients)"     strokeWidth={2} />
          <Area type="monotone" dataKey="appointments" name="Appointments"  stroke={CHART_COLORS.appointments} fill="url(#gAppointments)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (view === 'appointments') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis dataKey="name" stroke="hsl(215,15%,45%)" fontSize={12} />
          <YAxis stroke="hsl(215,15%,45%)" fontSize={12} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Bar  dataKey="appointments" name="Appointments" fill={CHART_COLORS.appointments} radius={[4, 4, 0, 0]} />
          <Line dataKey="patients"     name="New Patients" stroke={CHART_COLORS.patients}   strokeWidth={2} dot={{ r: 4, fill: CHART_COLORS.patients }} type="monotone" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  // view === 'trends': multi-line with staff & beds
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
        <XAxis dataKey="name" stroke="hsl(215,15%,45%)" fontSize={12} />
        <YAxis stroke="hsl(215,15%,45%)" fontSize={12} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Bar  dataKey="appointments" name="Appointments"  fill={CHART_COLORS.appointments} radius={[4, 4, 0, 0]} opacity={0.7} />
        <Line dataKey="patients"     name="Patients"      stroke={CHART_COLORS.patients}     strokeWidth={2} dot={{ r: 3 }} type="monotone" />
        <Line dataKey="staffOnDuty"  name="Staff on Duty" stroke={CHART_COLORS.staffOnDuty}  strokeWidth={2} dot={{ r: 3 }} type="monotone" strokeDasharray="4 2" />
        <Line dataKey="occupiedBeds" name="Occupied Beds" stroke={CHART_COLORS.occupiedBeds} strokeWidth={2} dot={{ r: 3 }} type="monotone" strokeDasharray="2 2" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// ─── Legend config per view ───────────────────────────────────────────────────
const CHART_LEGENDS: Record<ChartView, { color: string; label: string; shape: 'circle' | 'rect' | 'line' }[]> = {
  overview: [
    { color: CHART_COLORS.patients,     label: 'New Patients',       shape: 'circle' },
    { color: CHART_COLORS.appointments, label: 'Appointments',       shape: 'circle' },
  ],
  appointments: [
    { color: CHART_COLORS.appointments, label: 'Appointments (bars)', shape: 'rect'   },
    { color: CHART_COLORS.patients,     label: 'New Patients (line)', shape: 'line'   },
  ],
  trends: [
    { color: CHART_COLORS.appointments, label: 'Appointments',       shape: 'rect'   },
    { color: CHART_COLORS.patients,     label: 'Patients',           shape: 'line'   },
    { color: CHART_COLORS.staffOnDuty,  label: 'Staff on Duty',      shape: 'line'   },
    { color: CHART_COLORS.occupiedBeds, label: 'Occupied Beds',      shape: 'line'   },
  ],
};

// ─── Department Stats Row ─────────────────────────────────────────────────────
function DepartmentBreakdown({ departments }: {
  departments: { department: string; doctors: number; patients: number; appointmentsToday: number; occupiedBeds: number }[];
}) {
  if (!departments || departments.length === 0) {
    return (
      <div className="flex items-center justify-center h-[100px] text-muted-foreground text-sm">
        No department data available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {departments.map((dept) => (
        <motion.div
          key={dept.department}
          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
            <p className="font-medium text-foreground">{dept.department}</p>
            <p className="text-xs text-muted-foreground">
              {dept.doctors} doctors · {dept.patients} patients
            </p>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <p className="text-sm font-bold text-foreground">{dept.appointmentsToday}</p>
              <p className="text-xs text-muted-foreground">appts today</p>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{dept.occupiedBeds}</p>
              <p className="text-xs text-muted-foreground">beds used</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Today's Appointments (Admin hospital-wide) ───────────────────────────────
function TodayAppointmentsAdmin({ appointments }: {
  appointments: { patient: string; department: string; doctor: string; time: string }[];
}) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex items-center justify-center h-[100px] text-muted-foreground text-sm">
        No appointments today
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {appointments.map((apt, idx) => (
        <motion.div
          key={idx}
          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <div>
            <p className="font-medium text-foreground">{apt.patient}</p>
            <p className="text-xs text-muted-foreground">{apt.department} · Dr. {apt.doctor}</p>
          </div>
          <p className="text-sm font-semibold text-foreground">{apt.time}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { doctorUser, adminUser, isLoggedIn } = useSelector((state: RootState) => state.app);
  const doctorCode = useSelector((state: RootState) => state.app.doctorCode);
  const dispatch = useDispatch();

  const isAdmin  = !!adminUser;
  const isDoctor = !!doctorUser;

  const [chartView, setChartView] = useState<ChartView>('overview');

  useEffect(() => {
    if (doctorUser) dispatch(setDoctorInfo(doctorUser));
  }, [doctorUser, dispatch]);

  // ── Doctor queries ────────────────────────────────────────────────────────
  const doctorId = doctorUser?.id;

  const { data: apiData, isLoading: patientsLoading } = useGetDoctorPatientsQuery(
    doctorId ? String(doctorId) : skipToken, { refetchOnMountOrArgChange: true } 
  );
  useEffect(() => {
    if (apiData?.doctorCode != null) dispatch(setDoctorCode(apiData.doctorCode));
  }, [apiData?.doctorCode, dispatch]);

  const { data: doctorStats, isLoading: doctorStatsLoading } = useGetDoctorStatsQuery(
    doctorId ? String(doctorId) : skipToken, { refetchOnMountOrArgChange: true } 
  );

  const today = new Date().toISOString().split('T')[0];
  const { data: todayAppointments = [] } = useGetTodayAppointmentsQuery(
    doctorCode ? { doctorCode, date: today } : skipToken, { refetchOnMountOrArgChange: true } 
  );

  // ── Admin queries ─────────────────────────────────────────────────────────
  const adminId = adminUser?.id;
  const { data: admin } = useGetAdminDetailsQuery(adminId ? String(adminId) : skipToken, { refetchOnMountOrArgChange: true } );
  const hospitalId = admin?.hospital ?? "";
  const { data: hospital } = useGetHospitalByIdQuery(hospitalId || skipToken);
  const { data: adminStats, isLoading: adminStatsLoading } = useGetAdminStatsQuery(
    hospital?.hospitalId ? hospital.hospitalId : skipToken, { refetchOnMountOrArgChange: true } 
  );

  // ── Loading ───────────────────────────────────────────────────────────────
  const isLoading = isDoctor
    ? patientsLoading || doctorStatsLoading
    : adminStatsLoading;

  // ── Derived data ──────────────────────────────────────────────────────────
  const weeklyData = useMemo(
    () => (isAdmin ? adminStats?.weeklyStats : doctorStats?.weeklyStats) ?? [],
    [isAdmin, adminStats, doctorStats]
  );

  const totalPatientsForPct = isAdmin
    ? (adminStats?.totalPatients ?? 0)
    : (doctorStats?.totalPatients ?? apiData?.totalPatients ?? 0);

  const statusData = useMemo(() => {
    const raw = (isAdmin ? adminStats?.statusStats : doctorStats?.statusStats) ?? [];
    return raw.map((s) => ({
      ...s,
      color: STATUS_COLORS[s.name?.toLowerCase()] ?? FALLBACK_COLOR,
      pct: totalPatientsForPct > 0 ? Math.round((s.value / totalPatientsForPct) * 100) : 0,
    }));
  }, [isAdmin, adminStats, doctorStats, totalPatientsForPct]);

  const upcomingAppointments = useMemo(
    () => (isAdmin ? adminStats?.upcomingAppointments : doctorStats?.upcomingAppointments) ?? [],
    [isAdmin, adminStats, doctorStats]
  );

  // Admin: today's appointments hospital-wide
  // If your backend returns the array under a different key, e.g. appointmentsList:
const adminTodayAppointments = useMemo(() => {
  const raw = (adminStats as any)?.appointmentsList ?? adminStats?.todayAppointments;
  return Array.isArray(raw) ? raw : [];
}, [adminStats]);
  // Admin: department stats
  const departmentStats = useMemo(
    () => adminStats?.departmentStats ?? [],
    [adminStats]
  );

  // Recent activities: admin vs doctor
  const recentActivities = isAdmin ? recentActivitiesAdmin : recentActivitiesDoctor;

  const statsCards = useMemo(() => {
    if (isAdmin) return [
      { icon: Users,       label: 'Total Patients',       value: String(adminStats?.totalPatients ?? 0),     change: '+12.5%', trend: 'up'   as const, color: 'primary'     },
      { icon: Stethoscope, label: 'Total Doctors',        value: String(adminStats?.totalDoctors ?? 0),      change: '+5.2%',  trend: 'up'   as const, color: 'secondary'   },
      { icon: Calendar,    label: "Today's Appointments", value: String(adminStats?.todayAppointments ?? 0), change: '-3.1%',  trend: 'down' as const, color: 'accent'      },
      { icon: UserCheck,   label: 'Staff On Duty',        value: String(adminStats?.staffOnDuty ?? 0),       change: '+8.4%',  trend: 'up'   as const, color: 'success'     },
      { icon: Bed,         label: 'Occupied Beds',        value: String(adminStats?.occupiedBeds ?? 0),      change: '+2.1%',  trend: 'up'   as const, color: 'destructive' },
      { icon: AlertCircle, label: 'Critical Patients',    value: String(adminStats?.criticalPatients ?? 0),  change: '-1.5%',  trend: 'down' as const, color: 'warning'     },
    ];
    return [
      { icon: Users,       label: 'Total Patients',       value: String(doctorStats?.totalPatients ?? apiData?.totalPatients ?? 0),  change: '+12.5%', trend: 'up'   as const, color: 'primary'   },
      { icon: Stethoscope, label: 'Active Doctors',       value: '248',                                                              change: '+5.2%',  trend: 'up'   as const, color: 'secondary' },
      { icon: Calendar,    label: "Today's Appointments", value: String(doctorStats?.todayAppointments ?? todayAppointments.length), change: '-3.1%',  trend: 'down' as const, color: 'accent'    },
      { icon: Bed,         label: 'Available Beds',       value: '89',                                                               change: '+8.4%',  trend: 'up'   as const, color: 'success'   },
    ];
  }, [isAdmin, adminStats, doctorStats, apiData, todayAppointments]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants       = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        {isLoggedIn && <DashboardSidebar />}
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* ── Greeting ──────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {isAdmin
                  ? `Welcome back, ${adminUser.username.split(' ')[0]}!`
                  : doctorUser
                  ? `Welcome back, ${doctorUser.username.split(' ')[0]}!`
                  : 'Dashboard Overview'}
              </h1>
              <p className="text-muted-foreground flex items-center gap-1.5">
                {isAdmin ? (
                  <>
                    <Building2 className="w-4 h-4" />
                    Managing {adminStats?.hospitalName ?? adminUser?.hospital ?? 'your hospital'}
                    {adminStats && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {adminStats.totalDoctors} doctors · {adminStats.totalStaff} staff
                      </span>
                    )}
                  </>
                ) : doctorUser ? (
                  `Welcome to ${doctorUser.hospital || 'your hospital'}`
                ) : (
                  'View hospital statistics and performance metrics'
                )}
              </p>
            </motion.div>

            {/* ── Stats cards ───────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className={`grid grid-cols-1 sm:grid-cols-2 ${isAdmin ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 mb-8`}
            >
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

            {/* ── Admin-only: Doctor status breakdown ───────────────────────── */}
            {isAdmin && adminStats?.doctorStatusStats && adminStats.doctorStatusStats.length > 0 && (
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {adminStats.doctorStatusStats.map((ds) => (
                  <Card key={ds.status} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <Stethoscope className="w-4 h-4 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-foreground">{ds.count}</p>
                          <p className="text-xs text-muted-foreground capitalize">{ds.status.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* ── Weekly chart + Patient Status ─────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-lg">Weekly Overview</CardTitle>

                    {/* Admin: view toggle — 3 options now */}
                    {isAdmin ? (
                      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                        {(['overview', 'appointments', 'trends'] as ChartView[]).map((v) => (
                          <button
                            key={v}
                            onClick={() => setChartView(v)}
                            className={`text-xs px-3 py-1 rounded-md font-medium transition-colors capitalize ${
                              chartView === v
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" /> Patients</span>
                        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-secondary" /> Appointments</span>
                      </div>
                    )}
                  </div>

                  {/* Admin dynamic legend */}
                  {isAdmin && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1 flex-wrap">
                      {CHART_LEGENDS[chartView].map((l) => (
                        <span key={l.label} className="flex items-center gap-1.5">
                          {l.shape === 'circle' && <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />}
                          {l.shape === 'rect'   && <span className="w-2.5 h-2.5 rounded-sm"   style={{ background: l.color }} />}
                          {l.shape === 'line'   && <span className="w-4 h-0.5 inline-block"    style={{ background: l.color }} />}
                          {l.label}
                        </span>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  {weeklyData.length === 0 ? (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                      No weekly data available
                    </div>
                  ) : isAdmin ? (
                    <AdminWeeklyChart data={weeklyData as any} view={chartView} />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor={CHART_COLORS.patients}     stopOpacity={0.3} />
                            <stop offset="95%" stopColor={CHART_COLORS.patients}     stopOpacity={0}   />
                          </linearGradient>
                          <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor={CHART_COLORS.appointments} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={CHART_COLORS.appointments} stopOpacity={0}   />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                        <XAxis dataKey="name" stroke="hsl(215,15%,45%)" fontSize={12} />
                        <YAxis stroke="hsl(215,15%,45%)" fontSize={12} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Area type="monotone" dataKey="patients"     stroke={CHART_COLORS.patients}     fillOpacity={1} fill="url(#colorPatients)"     strokeWidth={2} />
                        <Area type="monotone" dataKey="appointments" stroke={CHART_COLORS.appointments} fillOpacity={1} fill="url(#colorAppointments)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Patient Status Breakdown */}
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

            {/* ── Admin-only: Department Breakdown + Today's Appointments ────── */}
            {isAdmin && (
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Department Overview</CardTitle>
                      <BarChart3 className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DepartmentBreakdown departments={departmentStats} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Today's Appointments</CardTitle>
                      <HeartPulse className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Hospital-wide</p>
                  </CardHeader>
                  <CardContent>
                    <TodayAppointmentsAdmin appointments={adminTodayAppointments} />
                  </CardContent>
                </Card>

              </motion.div>
            )}

            {/* ── Activity + Upcoming Appointments ─────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <Activity className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  {isAdmin && (
                    <p className="text-xs text-muted-foreground">Hospital-wide events</p>
                  )}
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
                          activity.status === 'success' ? 'bg-success/10'
                          : activity.status === 'warning' ? 'bg-warning/10'
                          : 'bg-primary/10'
                        }`}>
                          <activity.icon className={`w-4 h-4 ${
                            activity.status === 'success' ? 'text-success'
                            : activity.status === 'warning' ? 'text-warning'
                            : 'text-primary'
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
                  <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length === 0 ? (
                    <div className="flex items-center justify-center h-[160px] text-muted-foreground text-sm">
                      No upcoming appointments
                    </div>
                  ) : (
                    <div className="space-y-3">
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
                            <p className="text-sm text-muted-foreground">
                              {isAdmin ? apt.date : apt.room !== '—' ? `Room ${apt.room}` : ''}
                            </p>
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
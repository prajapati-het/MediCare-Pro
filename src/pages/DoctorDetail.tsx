import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Mail,
  Star,
  Calendar,
  Clock,
  Users,
  Building2,
  DollarSign,
  BadgeCheck,
  MapPin,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetDoctorDetailsQuery, useGetDoctorPatientsQuery } from '@/redux/slices/api';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Map status string → tailwind-friendly variant label */
function statusVariant(status: string) {
  if (status === 'Active') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (status === 'On Leave') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
}

/** Render filled / half / empty stars from a numeric rating string */
function StarRating({ rating }: { rating: string }) {
  const num = parseFloat(rating) || 0;
  const full = Math.floor(num);
  const hasHalf = num - full >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < full;
        const half = !filled && i === full && hasHalf;
        return (
          <Star
            key={i}
            className={`w-4 h-4 ${filled || half ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
          />
        );
      })}
      <span className="ml-1 text-sm font-medium text-foreground">{num.toFixed(1)}</span>
    </span>
  );
}

// ─── component ────────────────────────────────────────────────────────────────

export default function DoctorDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: patientsData,
    isLoading: dpLoading,
    isError: dpError,
  } = useGetDoctorPatientsQuery(id!, { skip: !id });

  const {
    data: doctor,
    isLoading,
    isError,
  } = useGetDoctorDetailsQuery(id!, { skip: !id });

  // ── loading / error states ──────────────────────────────────────────────────
  if (isLoading || dpLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading doctor profile…</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (isError || dpError || !doctor || !patientsData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-foreground">Doctor not found</p>
              <p className="text-sm text-muted-foreground">
                The profile you're looking for doesn't exist or failed to load.
              </p>
              <Button variant="outline" onClick={() => navigate('/doctors')}>
                Back to doctors
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ── derived values (no hardcoded fallbacks) ─────────────────────────────────
  const initials = doctor.username
    ? doctor.username
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'DR';

  // Build a simple weekly chart from patientsData if the backend ever returns
  // appointment counts per day — currently we just show total patients split
  // evenly across the doctor's availableDays as a visual placeholder driven
  // entirely by real data (availableDays + totalPatients).
  const weeklyChartData =
    doctor.availableDays && doctor.availableDays.length > 0 && patientsData.totalPatients > 0
      ? doctor.availableDays.map((day: string) => ({
          day: day.slice(0, 3),
          patients: Math.round(patientsData.totalPatients / doctor.availableDays.length),
        }))
      : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* ── Page header ──────────────────────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => navigate('/doctors')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage src={doctor.picture ?? undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {doctor.username}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <Badge className="bg-primary/10 text-primary border-0">
                      {doctor.speciality}
                    </Badge>
                    <StarRating rating={doctor.rating} />
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusVariant(doctor.status)}`}>
                      {doctor.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Metric cards ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Total patients — from getDoctorPatientsQuery */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {patientsData.totalPatients}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience — IDoctor.experience */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Clock className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{doctor.experience}</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next available — IDoctor.nextAvailable */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground leading-tight">
                        {doctor.nextAvailable}
                      </p>
                      <p className="text-xs text-muted-foreground">Next Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultation fee — IDoctor.consultationFee */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <DollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        ${doctor.consultationFee}
                      </p>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Main grid ────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left / main column */}
              <div className="lg:col-span-2 space-y-6">

                {/* Education — IDoctor.education */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {doctor.education}
                    </p>
                  </CardContent>
                </Card>

                {/* Patient distribution chart — driven by availableDays + totalPatients */}
                {weeklyChartData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Patient Distribution by Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">
                        Estimated from {patientsData.totalPatients} total patients across working days
                      </p>
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={weeklyChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="day"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <Tooltip
                            contentStyle={{
                              background: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              color: 'hsl(var(--foreground))',
                            }}
                          />
                          <Bar dataKey="patients" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}

                {/* Recent patients list — from getDoctorPatientsQuery */}
                {patientsData.patients && patientsData.patients.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {patientsData.patients.slice(0, 8).map((patient: any, index: number) => (
                          <div
                            key={patient._id ?? index}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                                {(patient.name ?? patient.username ?? '?')[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {patient.name ?? patient.username}
                                </p>
                                {patient.email && (
                                  <p className="text-xs text-muted-foreground">{patient.email}</p>
                                )}
                              </div>
                            </div>
                            {patient.appointmentType && (
                              <Badge variant="outline" className="text-xs">
                                {patient.appointmentType}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right sidebar */}
              <div className="space-y-6">

                {/* Contact — IDoctor.email / phone / hospital */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm break-all">{doctor.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm">{doctor.hospital}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability — IDoctor.availableDays + nextAvailable */}
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {doctor.availableDays && doctor.availableDays.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Working Days</p>
                        <div className="flex flex-wrap gap-1.5">
                          {doctor.availableDays.map((day: string) => (
                            <Badge key={day} variant="outline" className="text-xs">
                              {day.slice(0, 3)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Next Available Slot</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {doctor.nextAvailable}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick info — IDoctor.licenseNumber / doctorCode / role */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Doctor Code</span>
                      <span className="text-sm font-medium">{patientsData.doctorCode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">License</span>
                      <span className="text-sm font-medium font-mono">{doctor.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Speciality</span>
                      <span className="text-sm font-medium">{doctor.speciality}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Role</span>
                      <span className="text-sm font-medium capitalize">{doctor.role}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <span className="text-sm font-medium">{doctor.rating} / 5</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
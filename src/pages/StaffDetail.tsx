import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Mail,
  Edit,
  Calendar,
  Clock,
  Building2,
  Briefcase,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AddStaffRequest, AdminType, DoctorType } from '@/types/type';
import { useGetStaffByIdQuery, useGetStaffQuery, useGetUserDetailsQuery } from '@/redux/slices/api';

// ─── helpers ────────────────────────────────────────────────────────────────

function getInitials(staff: AddStaffRequest): string {
  if (staff.firstName && staff.lastName)
    return `${staff.firstName[0]}${staff.lastName[0]}`.toUpperCase();
  if (staff.name)
    return staff.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  return 'NA';
}

function getDisplayName(staff: AddStaffRequest): string {
  if (staff.name) return staff.name;
  return `${staff.firstName ?? ''} ${staff.lastName ?? ''}`.trim() || 'Unknown';
}

function getStatusColor(status: AddStaffRequest['status']): string {
  switch (status) {
    case 'on-duty':  return 'bg-success text-success-foreground';
    case 'off-duty': return 'bg-muted text-muted-foreground';
    case 'on-leave': return 'bg-warning text-warning-foreground';
  }
}

function getHospitalName(user: DoctorType | AdminType): string {
  return user.hospital ?? '';
}

function calcYearsOfService(joinDate: string): number {
  return Math.floor(
    (Date.now() - new Date(joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
}

// ─── component ──────────────────────────────────────────────────────────────

export default function StaffDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: currentUser } = useGetUserDetailsQuery();
  const hospital = currentUser ? getHospitalName(currentUser) : '';

  const { data: staff, isLoading, isError } = useGetStaffByIdQuery(id!, { skip: !id });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </main>
        </div>
      </div>
    );
  }

  // ── not found / error ──────────────────────────────────────────────────────
  if (isError || !staff) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar />
          <main className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground text-lg">
              {isError ? 'Failed to load staff data.' : 'Staff member not found.'}
            </p>
            <Button variant="outline" onClick={() => navigate('/staff')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Staff
            </Button>
          </main>
        </div>
      </div>
    );
  }

  // ── derived values ─────────────────────────────────────────────────────────
  const name        = getDisplayName(staff);
  const initials    = getInitials(staff);
  const yearsOfSvc  = staff.joinDate ? calcYearsOfService(staff.joinDate) : null;
  const joinDateFmt = staff.joinDate
    ? new Date(staff.joinDate).toLocaleDateString()
    : '—';

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Page header ── */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/staff')}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{name}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {staff.role       && <Badge variant="outline">{staff.role}</Badge>}
                      {staff.department && <Badge variant="secondary">{staff.department}</Badge>}
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  View Schedule
                </Button>
                <Button className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {yearsOfSvc ?? '—'}
                      </p>
                      <p className="text-xs text-muted-foreground">Years of Service</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground capitalize">
                        {staff.status.replace(/-/g, ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">Current Status</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {staff.shift || '—'}
                      </p>
                      <p className="text-xs text-muted-foreground">Shift</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {staff.salary != null
                          ? `$${staff.salary.toLocaleString()}`
                          : '—'}
                      </p>
                      <p className="text-xs text-muted-foreground">Monthly Salary</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ── Left column ── */}
              <div className="lg:col-span-2 space-y-6">

                {/* Shift card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shift Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            staff.status === 'on-duty'
                              ? 'bg-success animate-pulse'
                              : 'bg-muted-foreground'
                          }`}
                        />
                        <div>
                          <p className="font-medium text-foreground">
                            {staff.shift ? `${staff.shift} Shift` : 'No shift assigned'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {staff.department ?? 'No department'}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={staff.status === 'on-duty' ? 'default' : 'secondary'}
                      >
                        {staff.status.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Employment details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                      <DetailRow label="Employee ID"   value={staff.employeeId} />
                      <DetailRow label="Role"          value={staff.role} />
                      <DetailRow label="Department"    value={staff.department} />
                      <DetailRow label="Hospital"      value={staff.hospital} />
                      <DetailRow label="Shift"         value={staff.shift} badge />
                      <DetailRow label="Joining Date"  value={joinDateFmt} />
                      <DetailRow
                        label="Monthly Salary"
                        value={
                          staff.salary != null
                            ? `$${staff.salary.toLocaleString()}`
                            : undefined
                        }
                      />
                    </dl>
                  </CardContent>
                </Card>
              </div>

              {/* ── Right column ── */}
              <div className="space-y-6">

                {/* Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {staff.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <span className="text-sm break-all">{staff.email}</span>
                      </div>
                    )}
                    {staff.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <span className="text-sm">{staff.phone}</span>
                      </div>
                    )}
                    {staff.hospital && (
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <span className="text-sm">{staff.hospital}</span>
                      </div>
                    )}
                    {staff.emergencyContact && (
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">
                            Emergency Contact
                          </p>
                          <span className="text-sm">{staff.emergencyContact}</span>
                        </div>
                      </div>
                    )}
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

// ─── helper component ─────────────────────────────────────────────────────────

function DetailRow({
  label,
  value,
  badge = false,
}: {
  label: string;
  value?: string | number;
  badge?: boolean;
}) {
  if (value == null || value === '') return null;
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd>
        {badge ? (
          <Badge variant="outline">{value}</Badge>
        ) : (
          <span className="text-sm font-medium text-foreground">{value}</span>
        )}
      </dd>
    </div>
  );
}
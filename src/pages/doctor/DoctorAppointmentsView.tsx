import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  CalendarDays,
  Stethoscope,
  ClipboardList,
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CancelReasonModal } from "@/components/modals/CancelReasonModal";
import RescheduleModal from "@/components/modals/RescheduleModal";
import { Appointment } from "@/types/type";
import { useParams } from "react-router-dom";
import {
  useGetAppointmentsWithPatientInfoQuery,
  useGetDoctorDetailsQuery,
  useGetMonthlyAppointmentsQuery,
  useGetTodayAppointmentsQuery,
  useRescheduleAppointmentMutation,
  useUpdateAppointmentStatusMutation,
} from "@/redux/slices/api";
import { FetchBaseQueryError, skipToken } from "@reduxjs/toolkit/query";
import { cn } from "@/lib/utils";

type FilterType = "today" | "confirmed" | "monthly" | "pending";

export default function DoctorAppointmentsView() {
  const { toast } = useToast();
  const { filter } = useParams<{ filter: FilterType }>();

  let user = useSelector((state: RootState) => state.doctor.info);
  const { data: doctor, isLoading: isLoadingDoctor, isError: isErrorDoctor } = useGetDoctorDetailsQuery(String(user.id));
  user = doctor;

  console.log(user)

  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showCancel, setShowCancel] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const doctorCode = user?.doctorCode;

  const { data: todayAppointments = [], isLoading: todayLoading } =
    useGetTodayAppointmentsQuery(
      doctorCode && filter === "today"
        ? { doctorCode: String(doctorCode), date: today }
        : skipToken
    );

  const { data: monthlyAppointments = [], isLoading: monthlyLoading } =
    useGetMonthlyAppointmentsQuery(
      doctorCode && filter === "monthly"
        ? { doctorCode: String(doctorCode), month, year }
        : skipToken
    );

  const shouldFetchAll = Boolean(doctorCode) && filter !== "today" && filter !== "monthly";

const { data: allAppointmentsRaw, isLoading: allLoading } =
  useGetAppointmentsWithPatientInfoQuery(shouldFetchAll ? String(doctorCode) : skipToken);

  
  // Handle both raw array and { appointments: [...] } response shapes
  const allAppointments: Appointment[] = Array.isArray(allAppointmentsRaw)
    ? allAppointmentsRaw
    : (allAppointmentsRaw as any)?.appointments ?? [];

const filterNormalized = filter?.toLowerCase() as FilterType;


console.log(allAppointmentsRaw)

const filteredAppointments = (() => {
  if (filterNormalized === "today") return todayAppointments;
  if (filterNormalized === "monthly") return monthlyAppointments;
  if (!allAppointments) return [];

  if (filterNormalized === "confirmed")
    return allAppointments.filter((a) => a.status?.toLowerCase() === "confirmed");
  if (filterNormalized === "pending")
    return allAppointments.filter((a) => a.status?.toLowerCase() === "pending");

  return allAppointments;
})();

  const [updateStatus] = useUpdateAppointmentStatusMutation();
  const [rescheduleAppt] = useRescheduleAppointmentMutation();

  const approve = async (appt: Appointment) => {
    try {
      const { appointment } = await updateStatus({ id: String(appt.id), status: "Confirmed" }).unwrap();
      toast({ title: "Approved", description: `Confirmed with ${appointment.patientName}` });
    } catch (err: unknown) {
      // Type-safe error handling
      if (typeof err === "object" && err !== null && "data" in err) {
        const error = err as FetchBaseQueryError & { data?: { message?: string } };
        toast({
          title: "Error",
          description: error.data?.message || "Failed to approve",
          variant: "destructive",
        });
      } else {
        // fallback
        toast({
          title: "Error",
          description: "Failed to approve",
          variant: "destructive",
        });
      }
    }
  };

  const  cancel = async (reason: string) => {
    if (!selectedAppt) return;

    try {
      // Call mutation and unwrap safely
      const { appointment } = await updateStatus({
        id: String(selectedAppt.id),
        status: "Cancelled",
      }).unwrap();

      toast({
        title: "Cancelled",
        description: `Appointment with ${appointment.patientName} has been cancelled`,
        variant: "destructive",
      });

      setShowCancel(false);
      setSelectedAppt(null);
    } catch (err: unknown) {
      // Type-safe error handling
      if (typeof err === "object" && err !== null && "data" in err) {
        const error = err as FetchBaseQueryError & { data?: { message?: string } };
        toast({
          title: "Error",
          description: error.data?.message || "Failed to cancel",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel",
          variant: "destructive",
        });
      }
    }
  };

  const reschedule = async (date: string, time: string) => {
    if (!selectedAppt) return;
    try {
      await rescheduleAppt({ id: String(selectedAppt.id), date, time }).unwrap();
      toast({ title: "Rescheduled", description: `Moved to ${date} at ${time}` });
      setShowReschedule(false);
      setSelectedAppt(null);
    } catch {
      toast({ title: "Error", description: "Failed to reschedule", variant: "destructive" });
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────

  const getPageMeta = () => {
    switch (filter) {
      case "today":     return { title: "Today's Appointments",   desc: "Scheduled for today",                     icon: <CalendarDays className="w-5 h-5" /> };
      case "confirmed": return { title: "Confirmed Appointments", desc: "All confirmed bookings",                  icon: <CheckCircle2 className="w-5 h-5" /> };
      case "monthly":   return { title: "Monthly Appointments",   desc: "This month's schedule",                   icon: <Calendar className="w-5 h-5" /> };
      case "pending":   return { title: "Pending Appointments",   desc: "Approve, reschedule or cancel requests",  icon: <ClipboardList className="w-5 h-5" /> };
      default:          return { title: "Appointments",           desc: "View and manage your appointments",       icon: <Stethoscope className="w-5 h-5" /> };
    }
  };

  const statusConfig: Record<string, { dot: string; badge: string; label: string }> = {
    Pending:   { dot: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 border-amber-200",    label: "Pending" },
    Confirmed: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Confirmed" },
    Cancelled: { dot: "bg-red-500",     badge: "bg-red-50 text-red-700 border-red-200",          label: "Cancelled" },
    Completed: { dot: "bg-blue-500",    badge: "bg-blue-50 text-blue-700 border-blue-200",       label: "Completed" },
  };

  const getLeftBorder = (status: string) => {
    switch (status) {
      case "Pending":   return "border-l-amber-400";
      case "Confirmed": return "border-l-emerald-400";
      case "Cancelled": return "border-l-red-400";
      case "Completed": return "border-l-blue-400";
      default:          return "border-l-border";
    }
  };

  const isPending = filter === "pending";
  const isLoading = todayLoading || monthlyLoading || allLoading;
  const { title, desc, icon } = getPageMeta();

  // ── Stats bar (counts per status) ───────────────────────────────────────
  const stats = ["Pending", "Confirmed", "Completed", "Cancelled"].map((s) => ({
    label: s,
    count: filteredAppointments.filter((a) => a.status === s).length,
    ...statusConfig[s],
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* ── Page header ── */}
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                {icon}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">{title}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>

            {/* ── Stats pills ── */}
            {!isLoading && filteredAppointments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {stats.filter((s) => s.count > 0).map((s) => (
                  <div
                    key={s.label}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                      s.badge
                    )}
                  >
                    <div className={cn("w-1.5 h-1.5 rounded-full", s.dot)} />
                    {s.count} {s.label}
                  </div>
                ))}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-muted/50 text-muted-foreground border-border">
                  {filteredAppointments.length} Total
                </div>
              </div>
            )}

            {/* ── Loading ── */}
            {isLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 rounded-xl bg-muted/40 animate-pulse" />
                ))}
              </div>
            )}

            {/* ── Empty ── */}
            {!isLoading && filteredAppointments.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-16 text-center">
                  <CalendarDays className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-foreground">No appointments found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {filter === "today" ? "Nothing scheduled for today" : "No appointments match this filter"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* ── Appointment list ── */}
            {!isLoading && filteredAppointments.length > 0 && (
              <AnimatePresence>
                <div className="space-y-3">
                  {filteredAppointments.map((appt, index) => {
                    const cfg = statusConfig[appt.status] ?? statusConfig["Pending"];
                    const initials = appt.patientName
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2) ?? "?";

                    return (
                      <motion.div
                        key={appt.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04, type: "spring", stiffness: 300 }}
                      >
                        <Card className={cn("border-l-4 shadow-sm hover:shadow-md transition-shadow duration-200", getLeftBorder(appt.status))}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">

                              {/* Avatar */}
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/70 to-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0 shadow-sm">
                                {initials}
                              </div>

                              {/* Main info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-semibold text-sm text-foreground truncate">
                                    {appt.patientName}
                                  </span>
                                  <span className={cn("inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border", cfg.badge)}>
                                    <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                                    {appt.status}
                                  </span>
                                  {appt.type && (
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-muted/50 text-muted-foreground border-border">
                                      {appt.type}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {appt.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {appt.time}
                                  </span>
                                </div>
                              </div>

                              {/* Actions — only for pending filter */}
                              {isPending && (
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 px-2.5 text-xs gap-1"
                                    onClick={() => { setSelectedAppt(appt); setShowReschedule(true); }}
                                  >
                                    <RefreshCcw className="w-3 h-3" />
                                    <span className="hidden sm:inline">Reschedule</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 px-2.5 text-xs gap-1 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
                                    onClick={() => { setSelectedAppt(appt); setShowCancel(true); }}
                                  >
                                    <XCircle className="w-3 h-3" />
                                    <span className="hidden sm:inline">Cancel</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-8 px-2.5 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => approve(appt)}
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span className="hidden sm:inline">Approve</span>
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatePresence>
            )}
          </motion.div>
        </main>
      </div>

      <CancelReasonModal
        open={showCancel}
        onClose={() => { setShowCancel(false); setSelectedAppt(null); }}
        onConfirm={cancel}
      />

      {selectedAppt && (
        <RescheduleModal
          open={showReschedule}
          onClose={() => { setShowReschedule(false); setSelectedAppt(null); }}
          appointment={selectedAppt}
          allAppointments={filteredAppointments}
        />
      )}
    </div>
  );
}

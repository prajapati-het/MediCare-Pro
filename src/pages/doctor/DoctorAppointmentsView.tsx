import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateAppointmentStatus,
  rescheduleAppointment,
} from "@/redux/slices/appointmentsSlice";
import { CancelReasonModal } from "@/components/modals/CancelReasonModal";
import RescheduleModal from "@/components/modals/RescheduleModal";
import { Appointment } from "@/data/appointmentsData";
import { useParams } from "react-router-dom";

type FilterType = "today" | "confirmed" | "monthly" | "pending";

export default function DoctorAppointmentsView() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { filter } = useParams<{ filter: FilterType }>();

  console.log(filter);

  const user = useSelector((state: RootState) => state.app.user);
  const allAppointments = useSelector((state: RootState) => state.appointments.list);

  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showCancel, setShowCancel] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  // Filter appointments based on the route
  const getFilteredAppointments = () => {
    const doctorAppointments = allAppointments.filter(a => a.doctorId === user?.id);
    const today = new Date().toISOString().split("T")[0];
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    switch (filter) {
      case "today":
        return doctorAppointments.filter(a => a.date === today);
      case "confirmed":
        return doctorAppointments.filter(a => a.status === "Confirmed");
      case "monthly":
        return doctorAppointments.filter(a => {
          const apptDate = new Date(a.date);
          return apptDate.getMonth() === month && apptDate.getFullYear() === year;
        });
      case "pending":
        return doctorAppointments.filter(a => a.status === "Pending");
      default:
        return doctorAppointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  const getPageTitle = () => {
    switch (filter) {
      case "today":
        return "Today's Appointments";
      case "confirmed":
        return "Confirmed Appointments";
      case "monthly":
        return "Monthly Appointments";
      case "pending":
        return "Pending Appointments";
      default:
        return "Appointments";
    }
  };

  const getPageDescription = () => {
    switch (filter) {
      case "pending":
        return "Approve, reschedule or cancel requests";
      default:
        return "View and manage your appointments";
    }
  };

  const approve = (appt: Appointment) => {
    dispatch(updateAppointmentStatus({ id: appt.id, status: "Confirmed" }));
    toast({
      title: "Appointment Approved",
      description: `Confirmed with ${appt.patientName}`,
    });
  };

  const cancel = (reason: string) => {
    if (!selectedAppt) return;
    dispatch(
      updateAppointmentStatus({
        id: selectedAppt.id,
        status: "Cancelled",
        reason,
      })
    );
    toast({
      title: "Appointment Cancelled",
      description: "Reason saved",
      variant: "destructive",
    });
    setShowCancel(false);
    setSelectedAppt(null);
  };

  const reschedule = (date: string, time: string) => {
    if (!selectedAppt) return;
    dispatch(
      rescheduleAppointment({
        id: selectedAppt.id,
        date,
        time,
      })
    );
    toast({
      title: "Appointment Rescheduled",
      description: `${date} at ${time}`,
    });
    setShowReschedule(false);
    setSelectedAppt(null);
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "border-l-amber-500";
      case "Confirmed":
        return "border-l-emerald-500";
      case "Cancelled":
        return "border-l-red-500";
      case "Completed":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-700";
      case "Confirmed":
        return "bg-emerald-500/10 text-emerald-700";
      case "Cancelled":
        return "bg-red-500/10 text-red-700";
      case "Completed":
        return "bg-blue-500/10 text-blue-700";
      default:
        return "";
    }
  };

  const isPending = filter === "pending";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
            <p className="text-muted-foreground mb-8">{getPageDescription()}</p>

            {filteredAppointments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No appointments found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map(appt => (
                  <Card key={appt.id} className={`border-l-4 ${getBorderColor(appt.status)}`}>
                    <CardContent className="p-6 flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{appt.patientName}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {appt.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {appt.time}
                          </span>
                          <Badge variant="outline">{appt.type}</Badge>
                          <Badge 
                            variant="secondary"
                            className={getStatusBadgeClass(appt.status)}
                          >
                            {appt.status}
                          </Badge>
                        </div>
                      </div>

                      {isPending && (
                        <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedAppt(appt);
                              setShowReschedule(true);
                            }}
                          >
                            <RefreshCcw className="w-4 h-4 mr-1" />
                            Reschedule
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setSelectedAppt(appt);
                              setShowCancel(true);
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>

                          <Button size="sm" onClick={() => approve(appt)}>
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        </main>
      </div>

      <CancelReasonModal
        open={showCancel}
        onClose={() => {
          setShowCancel(false);
          setSelectedAppt(null);
        }}
        onConfirm={cancel}
      />

      {selectedAppt && (
        <RescheduleModal
          open={showReschedule}
          onClose={() => {
            setShowReschedule(false);
            setSelectedAppt(null);
          }}
          appointment={selectedAppt}
          allAppointments={filteredAppointments}
        />
      )}
    </div>
  );
}
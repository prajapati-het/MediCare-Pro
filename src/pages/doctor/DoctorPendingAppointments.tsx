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
// import { RescheduleModal } from "@/components/modals/RescheduleModal";

export default function DoctorPendingAppointments() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const user = useSelector((state: RootState) => state.app.user);

  const pendingAppointments = useSelector((state: RootState) =>
    state.appointments.list.filter(
      a => a.doctorId === user.id && a.status === "Pending"
    )
  );

  const [selectedAppt, setSelectedAppt] = useState<Appointment>(null);
  const [showCancel, setShowCancel] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const approve = (appt: Appointment) => {
    dispatch(updateAppointmentStatus({ id: appt.id, status: "Confirmed" }));
    toast({
      title: "Appointment Approved",
      description: `Confirmed with ${appt.patientName}`,
    });
  };

  const cancel = (reason: string) => {
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
  };

  const reschedule = (date: string, time: string) => {
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
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold mb-2">Pending Appointments</h1>
            <p className="text-muted-foreground mb-8">
              Approve, reschedule or cancel requests
            </p>

            <div className="space-y-4">
              {pendingAppointments.map(appt => (
                <Card key={appt.id} className="border-l-4 border-l-amber-500">
                  <CardContent className="p-6 flex flex-col lg:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{appt.patientName}</h3>
                      <div className="flex gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {appt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {appt.time}
                        </span>
                        <Badge variant="outline">{appt.type}</Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
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
                        className="text-destructive"
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      <CancelReasonModal
        open={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={cancel}
      />

      {selectedAppt && (
       <RescheduleModal
  open={showReschedule}
  onClose={() => setShowReschedule(false)}
  appointment={selectedAppt}
  allAppointments={pendingAppointments}
/>

      )}
    </div>
  );
}

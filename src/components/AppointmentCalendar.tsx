import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  RotateCcw,
  Check,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Appointment } from "@/data/appointmentsData";
import { useNavigate } from "react-router-dom";

import CancelAppointmentModal from "./modals/CancelAppointmentModal";
import RescheduleModal from "./modals/RescheduleModal";

interface Props {
  appointments: Appointment[];
}

export function AppointmentCalendar({ appointments }: Props) {
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  /* ---------------- EFFECTIVE STATUS ---------------- */
  const getEffectiveStatus = (apt: Appointment) => {
    if (["Cancelled", "Completed"].includes(apt.status)) return apt.status;

    const now = new Date();
    const apptDateTime = new Date(`${apt.date} ${apt.time}`);

    if (now > apptDateTime) return "Delayed";

    return apt.status;
  };

  const isVisibleOnCalendar = (apt: Appointment) => {
    const status = getEffectiveStatus(apt);
    return ["Pending", "Confirmed", "Delayed"].includes(status);
  };

  /* ---------------- APPOINTMENTS BY DATE ---------------- */
  const getAppointmentsForDate = useCallback(
    (date: Date) =>
      appointments.filter(
        (apt) =>
          isSameDay(new Date(apt.date), date) && isVisibleOnCalendar(apt)
      ),
    [appointments, isVisibleOnCalendar]
  );

  /* ---------------- DAYS GRID ---------------- */
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  /* ---------------- STATUS STYLE ---------------- */
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500";
      case "Pending":
        return "bg-amber-500";
      case "Delayed":
        return "bg-orange-600 animate-pulse";
      default:
        return "bg-muted";
    }
  };

  return (
    <>
      {/* ================= CALENDAR ================= */}
      <motion.div className="rounded-2xl shadow-lg border bg-card">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 bg-primary text-white">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft />
          </Button>

          <h2 className="text-lg font-bold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight />
          </Button>
        </div>

        {/* WEEKDAYS */}
        <div className="grid grid-cols-7 bg-muted/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="p-2 text-center font-semibold text-sm">
              {d}
            </div>
          ))}
        </div>

        {/* DAYS */}
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const appts = getAppointmentsForDate(day);

            return (
              <div
                key={day.toISOString()}
                onClick={() => {
                  setSelectedDate(day);
                  setIsDialogOpen(true);
                }}
                className={cn(
                  "p-2 min-h-[100px] border cursor-pointer",
                  !isSameMonth(day, currentMonth) && "opacity-40",
                  isToday(day) && "bg-primary/10"
                )}
              >
                <div className="text-sm font-semibold">{format(day, "d")}</div>

                {appts.slice(0, 2).map((apt) => {
                  const status = getEffectiveStatus(apt);
                  return (
                    <div
                      key={apt.id}
                      className={cn(
                        "mt-1 text-xs px-1 rounded text-white",
                        getStatusStyle(status)
                      )}
                    >
                      {apt.time} • {apt.patientName.split(" ")[0]}
                    </div>
                  );
                })}

                {appts.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{appts.length - 2} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ================= DIALOG ================= */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, "EEEE, MMM d yyyy")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {selectedDate &&
              getAppointmentsForDate(selectedDate).map((apt) => {
                const effectiveStatus = getEffectiveStatus(apt);
                const isLocked =
                  effectiveStatus === "Completed" ||
                  effectiveStatus === "Cancelled";

                return (
                  <Card key={apt.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{apt.patientName}</p>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="w-3 h-3" /> {apt.time}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* COMPLETE */}
                        <button
                          disabled={isLocked}
                          title="Complete"
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center disabled:opacity-40"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </button>

                        {/* CANCEL */}
                        <button
                          disabled={isLocked}
                          title="Cancel"
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowCancelModal(true);
                          }}
                          className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center disabled:opacity-40"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>

                        {/* FOLLOW-UP */}
                        <button
                          disabled={isLocked}
                          title="Follow-up"
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowRescheduleModal(true);
                          }}
                          className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center disabled:opacity-40"
                        >
                          <RotateCcw className="w-4 h-4 text-white" />
                        </button>

                        <Badge
                          className={cn(
                            "text-white",
                            getStatusStyle(effectiveStatus)
                          )}
                        >
                          {effectiveStatus}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>

      {selectedAppointment && (
        <CancelAppointmentModal
          open={showCancelModal}
          appointment={selectedAppointment}
          onClose={() => setShowCancelModal(false)}
        />
      )}

      {selectedAppointment && (
        <RescheduleModal
          open={showRescheduleModal}
          appointment={selectedAppointment}
          onClose={() => setShowRescheduleModal(false)}
          allAppointments={appointments}
        />
      )}
    </>
  );
}

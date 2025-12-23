import { useState, useMemo, useCallback, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import CancelAppointmentModal from "./modals/CancelAppointmentModal";
import RescheduleModal from "./modals/RescheduleModal";
import { updateAppointment } from "@/redux/slices/appointmentsSlice";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { RootState } from "@/redux/store";

export function AppointmentCalendar() {
  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  type ThemeType = "light" | "dark";

  const [calendarTheme, setCalendarTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setCalendarTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const doctorId = useSelector((state: RootState) => state.app.user?.id);

  const allAppointments = useSelector(
    (state: RootState) => state.appointments.list
  );

  const appointments = useMemo(() => {
    if (!doctorId) return [];
    return allAppointments.filter((apt) => apt.doctorId === doctorId);
  }, [allAppointments, doctorId]);

  useAutoRefresh(() => {
    setTime(new Date());
  }, 60000);

  useEffect(() => {
    const now = new Date();

    appointments.forEach((apt) => {
      const apptDateTime = new Date(`${apt.date} ${apt.time}`);

      if (now > apptDateTime && ["Pending", "Confirmed"].includes(apt.status)) {
        dispatch(
          updateAppointment({
            id: apt.id,
            changes: { status: "Delayed" },
          })
        );
      }
    });
  }, [time, appointments, dispatch]);

  const getEffectiveStatus = useCallback((apt: Appointment) => {
    if (["Cancelled", "Completed"].includes(apt.status)) return apt.status;
    const now = new Date();
    const apptDateTime = new Date(`${apt.date} ${apt.time}`);
    if (now > apptDateTime) return "Delayed";
    return apt.status;
  }, []);

  const isVisibleOnCalendar = useCallback(
    (apt: Appointment) => {
      const status = getEffectiveStatus(apt);
      return ["Pending", "Confirmed", "Delayed"].includes(status);
    },
    [getEffectiveStatus]
  );

  const getAppointmentsForDate = useCallback(
    (date: Date) =>
      appointments.filter(
        (apt: Appointment) =>
          isSameDay(new Date(apt.date), date) && isVisibleOnCalendar(apt)
      ),
    [appointments, isVisibleOnCalendar]
  );

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth)),
      end: endOfWeek(endOfMonth(currentMonth)),
    });
  }, [currentMonth]);

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

  const markCompleted = (apt: Appointment) => {
    dispatch(
      updateAppointment({
        id: apt.id,
        changes: { status: "Completed" },
      })
    );
  };

  return (
    <>
      {/* ================= CALENDAR ================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-2xl shadow-lg border transition-colors duration-300",
          calendarTheme === "dark"
            ? "bg-slate-900 text-slate-100 border-slate-700"
            : "bg-card text-foreground border-border"
        )}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 bg-primary text-white">
          {/* LEFT */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft />
          </Button>

          {/* CENTER */}
          <h2 className="text-lg font-bold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {/* NEXT MONTH */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight />
            </Button>

            {/* THEME TOGGLE – RIGHT AFTER > */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
              title="Toggle calendar theme"
            >
              {calendarTheme === "light" ? "🌙" : "☀️"}
            </motion.button>
          </div>
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
            const visibleAppts = appts.slice(0, 2);
            const moreCount = appts.length - visibleAppts.length;

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

                <div className="mt-1 space-y-1 max-h-[70px] overflow-y-auto pr-1">
                  {visibleAppts.map((apt: Appointment) => {
                    const status = getEffectiveStatus(apt);
                    return (
                      <div
                        key={apt.id}
                        className={cn(
                          "text-xs px-1 rounded text-white",
                          getStatusStyle(status)
                        )}
                      >
                        {apt.time} • {apt.patientName.split(" ")[0]}
                      </div>
                    );
                  })}

                  {moreCount > 0 && (
                    <div className="text-xs text-muted-foreground">
                      +{moreCount} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ================= DIALOG ================= */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {isDialogOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md" />
        )}
        <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, "EEEE, MMM d yyyy")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {selectedDate &&
              getAppointmentsForDate(selectedDate).map((apt: Appointment) => {
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
                          onClick={() => markCompleted(apt)}
                          title="Complete"
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center disabled:opacity-40"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </button>

                        {/* CANCEL */}
                        <button
                          disabled={isLocked}
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowCancelModal(true);
                          }}
                          title="Cancel"
                          className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center disabled:opacity-40"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>

                        {/* FOLLOW-UP */}
                        <button
                          disabled={isLocked}
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowRescheduleModal(true);
                          }}
                          title="Follow-up"
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

      {/* MODALS */}
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

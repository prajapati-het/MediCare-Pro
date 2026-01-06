import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Appointment } from "@/data/appointmentsData";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from "@/redux/slices/appointmentsSlice";
import { RootState } from "@/redux/store";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { useNavigate } from "react-router-dom";

export function AppointmentCalendar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctorId = useSelector((state: RootState) => state.app.doctorUser?.id);
  const allAppointments = useSelector(
    (state: RootState) => state.appointments.list
  );

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const appointments = useMemo(() => {
    if (!doctorId) return [];
    return allAppointments.filter((a) => a.doctorId === doctorId);
  }, [allAppointments, doctorId]);

  useAutoRefresh(() => {}, 60000);

  /* ---------- AUTO DELAY ---------- */
  useEffect(() => {
    const now = new Date();
    appointments.forEach((apt) => {
      const apptDateTime = new Date(`${apt.date} ${apt.time}`);
      if (now > apptDateTime && ["Pending", "Confirmed"].includes(apt.status)) {
        dispatch(
          updateAppointment({ id: apt.id, changes: { status: "Delayed" } })
        );
      }
    });
  }, [appointments, dispatch]);

  const getEffectiveStatus = useCallback((apt: Appointment) => {
    if (["Cancelled", "Completed"].includes(apt.status)) return apt.status;
    const now = new Date();
    const apptDateTime = new Date(`${apt.date} ${apt.time}`);
    return now > apptDateTime ? "Delayed" : apt.status;
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
      appointments
        .filter(
          (a) => isSameDay(new Date(a.date), date) && isVisibleOnCalendar(a)
        )
        .sort((a, b) => {
          const [aHour, aMinute] = a.time.split(/[: ]/).map(Number);
          const [bHour, bMinute] = b.time.split(/[: ]/).map(Number);
          const aIsPM = a.time.includes("PM") && aHour !== 12;
          const bIsPM = b.time.includes("PM") && bHour !== 12;

          const aTotal = (aHour % 12 + (aIsPM ? 12 : 0)) * 60 + aMinute;
          const bTotal = (bHour % 12 + (bIsPM ? 12 : 0)) * 60 + bMinute;

          return aTotal - bTotal;
        }),
    [appointments, isVisibleOnCalendar]
  );

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth)),
      }),
    [currentMonth]
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500";
      case "Pending":
        return "bg-amber-500";
      case "Delayed":
        return "bg-orange-600 animate-pulse";
      case "Cancelled":
        return "bg-red-500";
      case "Completed":
        return "bg-slate-500";
      default:
        return "bg-muted";
    }
  };

  /* ---------- NAVIGATE TO DATE PAGE ---------- */
  const openDatePage = (date: Date) => {
    // Format date as YYYY-MM-DD for URL
    const localDateStr = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    // Navigate to the patients page with the date parameter
    navigate(`/doctor/calendar/patients?date=${localDateStr}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl shadow-lg border bg-card text-foreground"
    >
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
              onClick={() => openDatePage(day)}
              className={cn(
                "p-2 min-h-[100px] border cursor-pointer hover:bg-muted/20 transition-colors",
                !isSameMonth(day, currentMonth) && "opacity-40",
                isToday(day) && "bg-primary/10"
              )}
            >
              <div className="text-sm font-semibold">{format(day, "d")}</div>
              <div className="mt-1 space-y-1 max-h-[70px] overflow-y-auto pr-1">
                {appts.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className={cn(
                      "text-xs px-1 rounded text-white",
                      getStatusStyle(getEffectiveStatus(apt))
                    )}
                  >
                    {apt.time} • {apt.patientName.split(" ")[0]}
                  </div>
                ))}
                {appts.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{appts.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
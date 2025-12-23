import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { rescheduleAppointment, Appointment } from "@/redux/slices/appointmentsSlice";

export default function RescheduleAppointmentModal({
  open,
  onClose,
  appointment,
  allAppointments,
}: {
  open: boolean;
  onClose: () => void;
  appointment: Appointment;
  allAppointments: Appointment[];
}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [error, setError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const hasConflict = allAppointments.some(
    (a) =>
      a.id !== appointment.id &&
      a.date === date &&
      a.time === time &&
      a.status !== "Cancelled"
  );

  const isPastTime = new Date(`${date} ${time}`) < new Date();

  const handleReschedule = () => {
    if (hasConflict || isPastTime) return;

    dispatch(
      rescheduleAppointment({
        id: appointment.id,
        date,
        time,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-3">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
        </DialogHeader>

        <input
          type="date"
          title="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={todayStr}
          className="border p-1 rounded"
        />
        <input
          type="time"
          title="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-1 rounded"
        />

        {(hasConflict || isPastTime) && (
          <p className="text-red-500 text-sm">
            {isPastTime
              ? "Cannot select a past time"
              : "Time slot already booked"}
          </p>
        )}

        <Button disabled={hasConflict || isPastTime} onClick={handleReschedule}>
          Confirm Reschedule
        </Button>
      </DialogContent>
    </Dialog>
  );
}

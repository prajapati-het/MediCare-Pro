import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRescheduleAppointmentMutation } from "@/redux/slices/api";

export default function RescheduleAppointmentModal({
  open,
  onClose,
  appointment,
  allAppointments,
}) {
  const [rescheduleAppointment, { isLoading }] =
    useRescheduleAppointmentMutation();

  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);

  const todayStr = new Date().toISOString().split("T")[0];

  const hasConflict = allAppointments.some(
    (a) =>
      a._id !== appointment._id &&
      a.date === date &&
      a.time === time &&
      a.status !== "Cancelled"
  );

  const isPastTime = new Date(`${date} ${time}`) < new Date();

  const handleReschedule = async () => {
    if (hasConflict || isPastTime) return;

    try {
      await rescheduleAppointment({
        id: appointment._id,
        date,
        time,
        status: "Confirmed",
      }).unwrap();

      onClose();
    } catch (err) {
      console.error("Reschedule failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-3">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Select a new date and time for this appointment.
          </DialogDescription>
        </DialogHeader>

        <input
          title="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={todayStr}
          className="border p-1 rounded"
        />

        <input
          title="Time"
          type="time"
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

        <Button
          disabled={hasConflict || isPastTime || isLoading}
          onClick={handleReschedule}
        >
          {isLoading ? "Updating..." : "Confirm Reschedule"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  rescheduleAppointment,
  Appointment,
} from "@/redux/slices/appointmentsSlice";

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

  const hasConflict = allAppointments.some(
    (a) =>
      a.id !== appointment.id &&
      a.date === date &&
      a.time === time &&
      a.status !== "Cancelled"
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
        </DialogHeader>

        <input type="date" title="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" title="time" value={time} onChange={(e) => setTime(e.target.value)} />

        {hasConflict && (
          <p className="text-red-500 text-sm">Time slot already booked</p>
        )}

        <Button
          disabled={hasConflict}
          onClick={() => {
            dispatch(
              rescheduleAppointment({
                id: appointment.id,
                date,
                time,
              })
            );
            onClose();
          }}
        >
          Confirm Reschedule
        </Button>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { updateAppointmentStatus, Appointment } from "@/redux/slices/appointmentsSlice";

export default function CancelAppointmentModal({
  open,
  onClose,
  appointment,
}: {
  open: boolean;
  onClose: () => void;
  appointment: Appointment;
}) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
        </DialogHeader>

        <textarea
          className="w-full border rounded p-2"
          placeholder="Reason for cancellation"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <Button
          variant="destructive"
          onClick={() => {
            dispatch(
              updateAppointmentStatus({
                id: appointment.id,
                status: "Cancelled",
                reason,
              })
            );
            onClose();
          }}
        >
          Confirm Cancellation
        </Button>
      </DialogContent>
    </Dialog>
  );
}

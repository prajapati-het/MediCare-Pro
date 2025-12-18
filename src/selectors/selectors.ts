import { RootState } from "@/redux/store";

export const selectAppointmentsByDoctor =
  (doctorId: number) => (state: RootState) =>
    state.appointments.list.filter(a => a.doctorId === doctorId);

export const selectPendingAppointmentsByDoctor =
  (doctorId: number) => (state: RootState) =>
    state.appointments.list.filter(
      a => a.doctorId === doctorId && a.status === "Pending"
    );

export const selectAppointmentById =
  (id: number) => (state: RootState) =>
    state.appointments.list.find(a => a.id === id);

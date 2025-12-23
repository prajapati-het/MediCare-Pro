import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTodayAppointmentsByDoctor = createSelector(
  [
    (state: RootState) => state.appointments.list,
    (_: RootState, doctorId: number) => doctorId,
    (_: RootState, __: number, today: string) => today,
  ],
  (appointments, doctorId, today) =>
    appointments.filter(
      a =>
        a.doctorId === doctorId &&
        a.date === today &&
        ["Pending", "Confirmed", "Delayed"].includes(a.status)
    )
);

export const selectMonthlyAppointmentsByDoctor = createSelector(
  [
    (state: RootState) => state.appointments.list,
    (_: RootState, doctorId: number) => doctorId,
    (_: RootState, __: number, month: number) => month,
    (_: RootState, __: number, ___: number, year: number) => year,
  ],
  (appointments, doctorId, month, year) =>
    appointments.filter(a => {
      const d = new Date(a.date);
      return (
        a.doctorId === doctorId &&
        d.getMonth() === month &&
        d.getFullYear() === year &&
        ["Pending", "Confirmed", "Delayed"].includes(a.status)
      );
    })
);



export const selectPatientsByDoctor = createSelector(
  [
    (state: RootState) => state.patients.list,
    (_: RootState, doctorId: number) => doctorId,
  ],
  (patients, doctorId) =>
    patients.filter(p => p.doctorId === doctorId)
);

export const selectPendingAppointmentsByDoctor =
  (doctorId: number) => (state: RootState) =>
    state.appointments.list.filter(
      a => a.doctorId === doctorId && a.status === "Pending"
    );

export const selectAppointmentById =
  (id: number) => (state: RootState) =>
    state.appointments.list.find(a => a.id === id);

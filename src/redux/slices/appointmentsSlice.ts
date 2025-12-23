// src/redux/slices/appointmentsSlice.ts
import { appointmentsData } from "@/data/appointmentsData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Appointment {
    id: number;
    doctorId: number;
    patientId: number;
    patientName: string;
    time: string;
    date: string;
    type: 'Consultation' | 'Check-up' | 'Follow-up' | 'Video Call' | 'Surgery' | 'Lab Review';
    status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'No Show' | 'Delayed';
    notes: string;
    duration: number;
    room: string;
    cancelReason?: string;
}

interface AppointmentsState {
    list: Appointment[];
}

const initialState: AppointmentsState = {
    list: appointmentsData,
};

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        updateAppointmentStatus: (
            state,
            action: PayloadAction<{
                id: number;
                status: Appointment["status"];
                reason?: string;
            }>
        ) => {
            const appt = state.list.find(a => a.id === action.payload.id);
            if (appt) {
                appt.status = action.payload.status;
                appt.cancelReason = action.payload.reason;
            }
        },

        rescheduleAppointment: (
            state,
            action: PayloadAction<{
                id: number;
                date: string;
                time: string;
            }>
        ) => {
            const appt = state.list.find(a => a.id === action.payload.id);
            if (appt) {
                appt.date = action.payload.date;
                appt.time = action.payload.time;
                appt.status = "Confirmed";
            }
        },
        updateAppointment: (
            state,
            action: PayloadAction<{
                id: number;
                changes: Partial<Appointment>;
            }>
        ) => {
            const index = state.list.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = {
                    ...state.list[index],
                    ...action.payload.changes,
                };
            }
        },
    },
});

export const {
    updateAppointmentStatus,
    rescheduleAppointment,
    updateAppointment
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DoctorType,
  AdminType,
  loginCredentialsType,
  signupCredentialsType,
  Appointment,
  Patient,
  Hospital,
} from "@/types/type";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: [
    "User",
    "Doctor",
    "Admin",
    "Appointment",
    "Patient",
    "Hospital",
  ],
  endpoints: (builder) => ({

    /* ===================== AUTH ===================== */

    login: builder.mutation<DoctorType | AdminType, loginCredentialsType>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    signup: builder.mutation<DoctorType | AdminType, signupCredentialsType>({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getUserDetails: builder.query<DoctorType | AdminType, void>({
      query: () => "/user/user-details",
      providesTags: ["User"],
    }),

    /* ===================== HOSPITAL ===================== */

    getHospitalById: builder.query<Hospital, string>({
      query: (hospitalId) => `/hospitals/${hospitalId}`,
      providesTags: ["Hospital"],
    }),

    /* ===================== DOCTOR ===================== */

    getDoctorAppointments: builder.query<Appointment[], string>({
      query: (doctorId) => `/appointments/doctor/${doctorId}`,
      providesTags: ["Appointment"],
    }),

    getDoctorPatients: builder.query<Patient[], string>({
      query: (doctorId) => `/patients/doctor/${doctorId}`,
      providesTags: ["Patient"],
    }),

    /* ===================== APPOINTMENTS ===================== */

    getAppointments: builder.query<Appointment[], void>({
      query: () => "/appointments",
      providesTags: ["Appointment"],
    }),

    getAppointmentById: builder.query<Appointment, string>({
      query: (id) => `/appointments/${id}`,
    }),

    updateAppointmentStatus: builder.mutation<
      Appointment,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/appointments/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Appointment"],
    }),

    /* ===================== PATIENTS ===================== */

    getPatients: builder.query<Patient[], void>({
      query: () => "/patients",
      providesTags: ["Patient"],
    }),

    getPatientById: builder.query<Patient, string>({
      query: (id) => `/patients/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,

  useGetHospitalByIdQuery,

  useGetDoctorAppointmentsQuery,
  useGetDoctorPatientsQuery,

  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentStatusMutation,

  useGetPatientsQuery,
  useGetPatientByIdQuery,
} = api;

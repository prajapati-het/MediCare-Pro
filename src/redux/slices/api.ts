import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DoctorType,
  AdminType,
  loginCredentialsType,
  signupCredentialsType,
  Appointment,
  Patient,
  Hospital,
  googleSignInResponseType,
  LoginResponse,
  AppointmentWithPatientInfo,
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

    login: builder.mutation<LoginResponse, loginCredentialsType>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    signup: builder.mutation<LoginResponse, signupCredentialsType>({
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

    googleSignIn: builder.mutation<googleSignInResponseType, { idToken: string }>({
      query: (body) => ({
        url: "/user/googleSignin",
        method: "POST",
        body,
      }),
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

    getDoctorPatients: builder.query<
      { doctorCode: string; patients: Patient[]; totalPatients: number },
      string
    >({
      query: (doctorId) => `/doctor/${doctorId}/patients`,
      providesTags: ["Doctor"],
    }),

    getDoctorDetails: builder.query<DoctorType, string>({
      query: (doctorId) => `/doctor/${doctorId}/details`,
      providesTags: ["Doctor"],
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


    getTodayAppointments: builder.query<Appointment[], { doctorCode: string; date: string }>({
      query: ({ doctorCode, date }) => `/appointments/doctor/${doctorCode}/day/${date}`,
      providesTags: ["Appointment"],
    }),

    getMonthlyAppointments: builder.query<Appointment[], { doctorCode: string; month: number; year: number }>({
        query: ({ doctorCode, month, year }) => {
          const monthStr = month.toString().padStart(2, "0");
          return `/appointments/doctor/${doctorCode}/month/${year}-${monthStr}`;
        },
        providesTags: ["Appointment"],
      }),

      // slices/api.ts
      getAppointmentsWithPatientInfo: builder.query<
        AppointmentWithPatientInfo[],  // Type includes patient info
        string                     // doctorCode
      >({
        query: (doctorCode) => `/appointments/doctor/${doctorCode}/with-patients`,
        providesTags: ["Appointment"],
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
  useGetDoctorDetailsQuery,

  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentStatusMutation,
  useGetTodayAppointmentsQuery,
  useGetMonthlyAppointmentsQuery,
  useGetAppointmentsWithPatientInfoQuery,

  useGetPatientsQuery,
  useGetPatientByIdQuery,

  useGoogleSignInMutation,

} = api;

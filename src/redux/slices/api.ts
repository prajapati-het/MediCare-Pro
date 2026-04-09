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
  AddDoctorRequest,
  AddDoctorResponse,
  AddStaffRequest,
  FacilityResponseType,
  ProblemType,
  AddProblemPayload,
  UpdateDoctorRequest,
  AdminStatsResponse,
} from "@/types/type";
import { AddAppointmentPayload } from "@/pages/BookAppointment";

export const api = createApi({
  reducerPath: "api",
  refetchOnFocus: true,      
  refetchOnReconnect: true, 
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
    "Staff",
    "Facility",
    "Problem"
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

    getDoctorsByHospital: builder.query<DoctorType[], string>({
      query: (hospitalId) => `/doctor/hospitals/${hospitalId}`,
      providesTags: ["Doctor"],
    }),

    addDoctor: builder.mutation<AddDoctorResponse , AddDoctorRequest>({
      query: (doctorData) => ({
        url: "/doctor/add",
        method: "POST",
        body: doctorData,
      }),
      invalidatesTags: ["Doctor"],
    }),

    getDoctors: builder.query<{ success: boolean; data: DoctorType[] }, { search?: string }>({
      query: (params) => ({ url: "/doctor/doctors", params }),
      providesTags: ["Doctor"],
    }),


    updateDoctor: builder.mutation<DoctorType, UpdateDoctorRequest>({
      query: ({ DoctorCode, data }) => ({
        url: `/doctor/${DoctorCode}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { DoctorCode }) => [{ type: 'Doctor', DoctorCode }],
    }),


    updateDoctorStatus: builder.mutation<
      DoctorType,
      { DoctorCode: string; status: string }
    >({
      query: ({ DoctorCode, status }) => ({
        url: `/doctor/${DoctorCode}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (_r, _e, { DoctorCode }) => [
        { type: "Doctor", id: DoctorCode },
      ],
    }),

    /* ===================== APPOINTMENTS ===================== */

    getAppointments: builder.query<Appointment[], void>({
      query: () => "/appointments",
      providesTags: ["Appointment"],
    }),

    getAppointmentById: builder.query<Appointment, string>({
      query: (id) => `/appointments/${id}`,
    }),

    // updateAppointmentStatus: builder.mutation<
    //   Appointment,
    //   { id: string; status: string }
    // >({
    //   query: ({ id, status }) => ({
    //     url: `/appointments/${id}`,
    //     method: "PATCH",
    //     body: { status },
    //   }),
    //   invalidatesTags: ["Appointment"],
    // }),


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

      
      getAppointmentsWithPatientInfo: builder.query<
        AppointmentWithPatientInfo[], 
        string                  
      >({
        query: (doctorCode) => `/appointments/doctor/${doctorCode}/with-patients`,
        providesTags: ["Appointment"],
      }),


      addAppointment: builder.mutation<{ success: boolean; data: Appointment }, AddAppointmentPayload>({
        query: (body) => ({ url: "/appointments", method: "POST", body }),
        invalidatesTags: ["Appointment"],
      }),

      updateAppointmentStatus: builder.mutation<
        { appointment: Appointment; patientEntry: Patient },
        { id: string; status: string; reason?: string }   // ← reason is optional
      >({
        query: ({ id, status, reason }) => ({
          url: `/appointments/${id}/status`,
          method: "PATCH",
          body: {
            status,
            ...(reason ? { reason } : {}),   // only send reason when present
          },
        }),
        // Invalidate relevant tags so the appointments list refreshes automatically
        invalidatesTags: ["Appointment"],
      }),


    rescheduleAppointment: builder.mutation<
      any,
      { id: string; date: string; time: string; status: string }
    >({
      query: ({ id, date, time, status }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: { date, time, status },
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

    updatePatient: builder.mutation<
      { success: boolean; data: Patient },
      { id: string; body: Partial<Patient> }
    >({
      query: ({ id, body }) => ({
        url: `/patients/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Patient", "Doctor"],
    }),

    /* =================== ADMIN ==========================*/

    getAdminDetails: builder.query<AdminType, string>({
      query: (adminId) => `/admin/${adminId}/details`,
      providesTags: ["Admin"],
    }),


    /* ================== STAFF ========================= */

    getStaff: builder.query<AddStaffRequest[], string>({
      query: (hospital) =>
        `staff?hospital=${encodeURIComponent(hospital)}`,
      providesTags: ["Staff"],
    }),

    getStaffById: builder.query<AddStaffRequest, string>({
      query: (id) => `staff/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Staff", id }],
    }),

    addStaff: builder.mutation<AddStaffRequest, Partial<AddStaffRequest>>({
      query: (body) => ({
        url: "staff",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),

    updateStaff: builder.mutation<
      AddStaffRequest,
      { id: string; data: Partial<AddStaffRequest> }
    >({
      query: ({ id, data }) => ({
        url: `staff/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),

    deleteStaff: builder.mutation<void, string>({
      query: (id) => ({
        url: `staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),



    /* ==================  FACILITY =================== */

    getFacilities: builder.query<
      { success: boolean; data: FacilityResponseType[] },
      string
    >({
      query: (hospitalId) => ({
        url: `/facilities?hospitalId=${hospitalId}`,
        method: "GET",
      }),
    }),

    addFacility: builder.mutation<
      { success: boolean; data: FacilityResponseType },
      Partial<FacilityResponseType>
    >({
      query: (body) => ({
        url: `/facilities`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Facility"],
    }),




    /* ================== PROBLEM ==================== */

    getProblemsByHospital: builder.query<ProblemType[], string>({
      query: (hospitalId) => `/problems?hospitalId=${hospitalId}`,
      providesTags: ["Problem"],
    }),

    addProblem: builder.mutation<
      { success: boolean; data: ProblemType },
      AddProblemPayload
    >({
      query: (body) => ({ url: "/problems", method: "POST", body }),
      invalidatesTags: ["Problem"],
    }),



    /* ==================== STATS ============================= */

    // in your api slice builder
    getDoctorStats: builder.query<any, string>({
      query: (doctorId) => `/doctor-stats/${doctorId}`,
    }),

    getAdminStats: builder.query<AdminStatsResponse, string>({
      query: (hospitalId) => `/admin-stats/${hospitalId}/stats`,
    }),

    /* ===================== BILL ***************************** */

    createBill: builder.mutation({
      query: (data) => ({
        url: "/bill/create",
        method: "POST",
        body: data,
      }),
    }),

    getBillById: builder.query({
      query: (id) => `/bill/${id}`,
    }),

    getBillsByDoctor: builder.query({
      query: (doctorCode) =>
        `/bill/doctor/${doctorCode}`,
    }),

    getBillsByPatient: builder.query({
      query: (patientId) =>
        `/bill/patient/${patientId}`,
    }),

    updateBillStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/bill/${id}/status`,
        method: "PUT",
        body: { status },
      }),
    }),


  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGoogleSignInMutation,
  useGetUserDetailsQuery,


  useGetHospitalByIdQuery,


  useGetDoctorAppointmentsQuery,
  useGetDoctorPatientsQuery,
  useGetDoctorDetailsQuery,
  useGetDoctorsByHospitalQuery,
  useAddDoctorMutation,
  useGetDoctorsQuery,
  useUpdateDoctorMutation,
  useUpdateDoctorStatusMutation,


  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentStatusMutation,
  useGetTodayAppointmentsQuery,
  useGetMonthlyAppointmentsQuery,
  useGetAppointmentsWithPatientInfoQuery,
  useAddAppointmentMutation,
  useRescheduleAppointmentMutation,


  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
  

  useGetAdminDetailsQuery,


  useAddStaffMutation,
  useGetStaffByIdQuery,
  useDeleteStaffMutation,
  useGetStaffQuery,
  useUpdateStaffMutation,


  useGetFacilitiesQuery,
  useAddFacilityMutation,


  useGetProblemsByHospitalQuery,
  useAddProblemMutation,


  useGetDoctorStatsQuery,
  useGetAdminStatsQuery,


  useCreateBillMutation,
  useGetBillByIdQuery,
  useGetBillsByDoctorQuery,
  useGetBillsByPatientQuery,
  useUpdateBillStatusMutation,

} = api;

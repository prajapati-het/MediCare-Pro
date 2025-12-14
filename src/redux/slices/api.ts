import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DoctorType, AdminType, loginCredentialsType, signupCredentialsType } from "@/types/type";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<DoctorType | AdminType, loginCredentialsType>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
        credentials: "include",
      }),
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
        credentials: "include",
      }),
    }),
    getUserDetails: builder.query<DoctorType | AdminType, void>({
      query: () => ({
        url: "/user/user-details",
        cache: "no-store",
      }),
    })
    // ,
    // googleSignIn: builder.mutation<googleSignInResponseType, { idToken: string }>({
    //   query: (body) => ({
    //     url: "/user/googleSignin",
    //     method: "POST",
    //     body,
    //   }),
    // })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useSignupMutation,
  // useGoogleSignInMutation,
} = api;

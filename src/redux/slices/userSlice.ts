import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DoctorType, AdminType } from "@/types/type";

export type AppUser = DoctorType | AdminType;

interface UserState {
  users: AppUser[];
}

const initialState: UserState = {
  users: [
    // City General Hospital (5)
    { id: 1, username: "sarah", email: "drsarah@medico.ac.in", hospital: "city-general", role: "doctor" },
    { id: 2, username: "sarahmitchell", email: "drsarahmitchell@medico.ac.in", hospital: "city-general", role: "doctor" },
    { id: 3, username: "het", email: "drhet@medico.ac.in", hospital: "metro-health", role: "doctor" },
    { id: 4, username: "emily", email: "dremily@medico.ac.in", hospital: "city-general", role: "doctor" },
    { id: 5, username: "emilydavis", email: "dremilydavis@medico.ac.in", hospital: "city-general", role: "doctor" },

    // Metro Health Center (5)
    { id: 6, username: "michael", email: "drmichael@medico.ac.in", hospital: "metro-health", role: "doctor" },
    { id: 7, username: "michaelchen", email: "drmichaelchen@medico.ac.in", hospital: "metro-health", role: "doctor" },
    { id: 8, username: "arjun", email: "drarjun@medico.ac.in", hospital: "metro-health", role: "doctor" },
    { id: 9, username: "neeraj", email: "drneeraj@medico.ac.in", hospital: "metro-health", role: "doctor" },
    { id: 10, username: "pooja", email: "drpooja@medico.ac.in", hospital: "metro-health", role: "doctor" },

    // Sunrise Medical Complex (5)
    { id: 11, username: "james", email: "drjames@medico.ac.in", hospital: "sunrise-medical", role: "doctor" },
    { id: 12, username: "jameswilson", email: "drjameswilson@medico.ac.in", hospital: "sunrise-medical", role: "doctor" },
    { id: 13, username: "ankit", email: "drankit@medico.ac.in", hospital: "sunrise-medical", role: "doctor" },
    { id: 14, username: "megha", email: "drmegha@medico.ac.in", hospital: "sunrise-medical", role: "doctor" },
    { id: 15, username: "rahul", email: "drrahul@medico.ac.in", hospital: "sunrise-medical", role: "doctor" },

    // Valley Regional Hospital (5)
    { id: 16, username: "lisa", email: "drlisa@medico.ac.in", hospital: "valley-regional", role: "doctor" },
    { id: 17, username: "robert", email: "drrobert@medico.ac.in", hospital: "valley-regional", role: "doctor" },
    { id: 18, username: "sneha", email: "drsneha@medico.ac.in", hospital: "valley-regional", role: "doctor" },
    { id: 19, username: "vikram", email: "drvikram@medico.ac.in", hospital: "valley-regional", role: "doctor" },
    { id: 20, username: "nisha", email: "drnisha@medico.ac.in", hospital: "valley-regional", role: "doctor" }
    ]
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    appendUser: (
      state,
      action: PayloadAction<Omit<AppUser, "id">>
    ) => {
      const nextId =
        state.users.length > 0
          ? state.users[state.users.length - 1].id + 1
          : 1;

      state.users.push({
        id: nextId,
        ...action.payload,
      });
    },
  },
});

export const { appendUser } = userSlice.actions;
export default userSlice.reducer;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import appReducer from "./slices/appSlice";
// // import userReducer from "./slices/userSlice";
// import appointmentsReducer from "./slices/appointmentsSlice";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import patientsReducer from "./slices/patientsSlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["app","appointments","patients"],
// };

// const rootReducer = combineReducers({
//   app: appReducer,    
//   // user: userReducer,   
//   appointments: appointmentsReducer,
//   patients: patientsReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;




import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
// import userReducer from "./slices/userSlice";
import appointmentsReducer from "./slices/appointmentsSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import patientsReducer from "./slices/patientsSlice";
import { api } from "./slices/api";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app","appointments","patients"],
};

const rootReducer = combineReducers({
  app: appReducer,    
  // user: userReducer,   
  appointments: appointmentsReducer,
  patients: patientsReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
middleware: (getDefaultMiddleware) =>
  (getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }) as any).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;


// import authSlice from '../redux/fetures/auth/authSlice'
// import { configureStore } from "@reduxjs/toolkit";
// import baseApi from "./api/baseApi";
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // ✅ এটাই সঠিক

// import {
//   FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
// } from "redux-persist";

// const persistConfig = {
//   key: 'auth',
//   storage, // ✅ localStorage use করবে
// };

// const persistedAuthReducer = persistReducer(persistConfig, authSlice);

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: persistedAuthReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(baseApi.middleware),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import baseApi from "./api/baseApi";
import authSlice from '../redux/fetures/auth/authSlice';

// ✅ manually localStorage define করুন
const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
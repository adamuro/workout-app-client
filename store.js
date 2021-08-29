import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
    user: userReducer,
  },
});
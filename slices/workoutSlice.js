import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workouts: [],
  selected: null,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
    },
    addWorkout: (state, action) => {
      state.workouts = [action.payload, ...state.workouts];
    },
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter((workout) => workout._id !== action.payload);
    },
    updateWorkout: (state, action) => {
      state.workouts = state.workouts.map((workout) => workout._id !== action.payload._id ? workout : action.payload);
    },
    setSelected: (state, action) => {
      state.selected = state.selected !== action.payload ? action.payload : null;
    }
  },
});

export const { setWorkouts, addWorkout, deleteWorkout, updateWorkout, setSelected } = workoutSlice.actions;

export const selectWorkouts = (state) => state.workout.workouts;
export const selectSelected = (state) => state.workout.selected;

export default workoutSlice.reducer;
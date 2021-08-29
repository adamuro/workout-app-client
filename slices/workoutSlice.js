import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workouts: [],
  selectedWorkout: null,
  selectedExercise: null,
};

// TODO: check if workout/exercise is selected in components and pass null when true instead of checking in reducers
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
    setSelectedWorkout: (state, action) => {
      state.selectedWorkout = state.selectedWorkout !== action.payload ? action.payload : null;
      state.selectedExercise = null;
    },
    setSelectedExercise: (state, action) => {
      state.selectedExercise = state.selectedExercise !== action.payload ? action.payload : null;
    },
  },
});

export const { setWorkouts, addWorkout, deleteWorkout, updateWorkout, setSelectedWorkout, setSelectedExercise } = workoutSlice.actions;

export const selectWorkouts = (state) => state.workout.workouts;
export const selectSelectedWorkout = (state) => state.workout.selectedWorkout;
export const selectSelectedExercise = (state) => state.workout.selectedExercise;

export default workoutSlice.reducer;
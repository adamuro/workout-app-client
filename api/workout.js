import { fetchServerAuthorized, headerContentTypeJSON } from "./common";

export const fetchGetAllWorkouts = () => fetchServerAuthorized("workout", "GET");
export const fetchDeleteWorkout = (_id) => fetchServerAuthorized(`workout/${_id}`, "DELETE");
export const fetchAddWorkout = () => fetchServerAuthorized("workout", "POST");
export const fetchAddExercise = (_id, exercise) => fetchServerAuthorized(`workout/exercise/${_id}`, "POST", headerContentTypeJSON, JSON.stringify({ exercise }));
export const fetchDeleteExercise = (_id) => fetchServerAuthorized(`workout/exercise/${_id}`, "DELETE");
export const fetchAddSeries = (_id, series) => fetchServerAuthorized(`workout/series/${_id}`, "POST", headerContentTypeJSON, JSON.stringify({ series }));
export const fetchDeleteSeries = (_id) => fetchServerAuthorized(`workout/series/${_id}`, "DELETE");
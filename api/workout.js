const serverURL = "https://silka-api.herokuapp.com";
const headerContentTypeJSON = { "Content-Type": "application/json" };

const fetchServer = (route, method, headers, body) => {
  return fetch(`${serverURL}/${route}`, { method, headers, body })
    .then((response) => response.json())
    .catch((error) => { error: error.message });
};

export const fetchGetAllWorkouts = () => fetchServer("workout", "GET");
export const fetchDeleteWorkout = (_id) => fetchServer(`workout/${_id}`, "DELETE");
export const fetchAddWorkout = () => fetchServer("workout", "POST");
export const fetchAddExercise = (_id, exercise) => fetchServer(`workout/exercise/${_id}`, "POST", headerContentTypeJSON, JSON.stringify({ exercise }));
export const fetchDeleteExercise = (_id) => fetchServer(`workout/exercise/${_id}`, "DELETE");
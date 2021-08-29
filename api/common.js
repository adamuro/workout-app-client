import AsyncStorage from "@react-native-async-storage/async-storage";
const getStorageToken = async () => {
  return AsyncStorage.getItem("token")
    .then((token) => token)
    .catch((error) => null);
};

// const serverURL = "https://silka-api.herokuapp.com";
const serverURL = "http://localhost:2137";

export const headerContentTypeJSON = { "Content-Type": "application/json" };
export const createHeaderAuthorizationToken = (token) => ({ "Authorization": `Bearer ${token}`});

export const fetchServer = async (route, method, headers, body) => {
  return fetch(`${serverURL}/${route}`, { method, headers, body })
    .then((response) => response.json())
    .catch((error) => { error: error.message });
};

export const fetchServerAuthorized = async (route, method, headers, body) => {
  const token = await getStorageToken();
  headers = { ...headers, ...createHeaderAuthorizationToken(token) };
  return fetch(`${serverURL}/${route}`, { method, headers, body })
    .then((response) => response.json())
    .catch((error) => { error: error.message });
};
import { fetchServer, fetchServerAuthorized, headerContentTypeJSON } from "./common";

export const fetchLogin = (user) => fetchServer("user/login", "POST", headerContentTypeJSON, JSON.stringify(user));
export const fetchLogout = () => fetchServerAuthorized("user/logout", "DELETE");
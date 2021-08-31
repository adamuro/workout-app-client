import { fetchServer, fetchServerAuthorized, headerContentTypeJSON } from "./common";

export const fetchRegister = (user) => fetchServer("user/register", "POST", headerContentTypeJSON, JSON.stringify(user));
export const fetchLogin = (user) => fetchServer("user/login", "POST", headerContentTypeJSON, JSON.stringify(user));
export const fetchLogout = () => fetchServerAuthorized("user/logout", "DELETE");
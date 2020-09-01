const tryParse = (json: string | null, _default: any) => {
  try {
    return JSON.parse(json || "");
  } catch (error) {
    return _default;
  }
};

const getCookie = (name: string, _default: any = {}) =>
  tryParse(localStorage.getItem(name), _default);
const setCookie = (name: string, data: JSON) =>
  localStorage.setItem(name, JSON.stringify(data));
const existsCookie = (name: string) => !!localStorage.getItem(name);
const deleteCookie = (name: string) => localStorage.removeItem(name);

const TOKEN_AUTH = "TOKEN_AUTH";
interface ITokenAuth {
  tokenUser: string;
  user_id?: string;
  role?: string;
  name?: string;
  email?: string;
}
export const getTokenAuthCookie = () => <ITokenAuth>getCookie(TOKEN_AUTH);
export const setAuthTokenCookie = (data: ITokenAuth) =>
  setCookie(TOKEN_AUTH, data as any);
export const existsAuthCookie = () => existsCookie(TOKEN_AUTH);
export const deleteAuthCookie = () => deleteCookie(TOKEN_AUTH);

/* COOKIE TO ACTIVATE USER */
const USER_TO_ACTIVATE = "USER_TO_ACTIVATE";
interface userToActivate {
  user_id?: string;
  name?: string;
  email: string;
  phone: string;
}
export const setUserToActivateCookie = (data: userToActivate) =>
  setCookie(USER_TO_ACTIVATE, data as any);
export const getUserToActivateCookie = () =>
  <userToActivate>getCookie(USER_TO_ACTIVATE);
export const existsUserToActivateCookie = () => existsCookie(USER_TO_ACTIVATE);
export const deleteUserToActivateCookie = () => deleteCookie(USER_TO_ACTIVATE);

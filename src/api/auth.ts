import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const ENDPOINTS = {
  LOGIN: "/users/login",
  REGISTER: "/users/create_account",
};

const DEFAULT_HEADERS = {
  "content-type": "application/json",
};

export async function login(username: string, password: string) {
  try {
    const ENDPOINT = URL + ENDPOINTS.LOGIN;
    const HEADERS = {
      ...DEFAULT_HEADERS,
    };
    const user = await axios.post(
      ENDPOINT,
      { username, password },
      { headers: HEADERS }
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
